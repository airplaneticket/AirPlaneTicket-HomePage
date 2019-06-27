const flightModel = require('../models/flight.model');
const airportModel = require('../models/airPort.model');
const seatTypeModel = require("../models/seatType.model");

caculateTime = async(booking) => {
    let departTime = booking.flightDepartTime.split(':').map(num => parseInt(num));
    let flightTime = booking.flightTime.split(':').map(num => parseInt(num));
    let minute = departTime[1] + flightTime[1];
    let hour = departTime[0] + flightTime[0];
    if (minute >= 60) {
        hour += 1;
        minute -= 60;
    }
    let oldTime = new Object();
    oldTime.year = booking.flightDate.year;
    oldTime.month = booking.flightDate.month;
    oldTime.day = booking.flightDate.day;
    let tempTime = booking.flightDate;
    switch (booking.flightDate.month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
            {
                if (booking.flightDate.day === 31 && hour >= 24) {
                    tempTime.day = 1;
                    tempTime.month += 1;
                } else if (hour >= 24) {
                    tempTime.day += 1;
                }
                break;
            }
        case 12:
            {
                if (booking.flightDate.day === 31 && hour >= 24) {
                    tempTime.day = 1;
                    tempTime.month = 1;
                    tempTime.year += 1;
                } else if (hour >= 24) {
                    tempTime.day += 1;
                }
                break;
            }
        case 2:
            {
                if (booking.flightDate.year % 400 === 0 || (booking.flightDate.year % 4 === 0 && booking.flightDate.year % 100 !== 0)) {
                    if (booking.flightDate.day === 29 && hour >= 24) {
                        tempTime.day = 1;
                        tempTime.month += 1;
                    } else if (hour >= 24) {
                        tempTime.day += 1;
                    }
                } else {
                    if (booking.flightDate.day === 28 && hour >= 24) {
                        tempTime.day = 1;
                        tempTime.month += 1;
                    } else if (hour >= 24) {
                        tempTime.day += 1;
                    }
                }
                break;
            }
        case 4:
        case 6:
        case 9:
        case 11:
            {
                if (booking.flightDate.day === 30 && hour >= 24) {
                    tempTime.day = 1;
                    tempTime.month += 1;
                } else if (hour >= 24) {
                    tempTime.day += 1;
                }
                break;
            }
    }
    if (hour >= 24) {
        hour -= 24
    }
    if (hour < 9) {
        booking.arrivalTime = "0" + hour + ":";
    } else {
        booking.arrivalTime = hour + ":";
    }
    if (minute < 9) {
        booking.arrivalTime += "0" + minute;
    } else {
        booking.arrivalTime += minute;
    }
    booking.flightDate = oldTime.day + " " + oldTime.month + " " + oldTime.year;
    booking.arrivalDate = tempTime.day + " " + tempTime.month + " " + tempTime.year;
}

format = async(inputData) => {
    try {
        let searchTime = inputData.bookingDepartTime.split('-');
        searchTime = {
            day: parseInt(searchTime[0]),
            month: parseInt(searchTime[1]),
            year: parseInt(searchTime[2])
        }
        inputData.bookingDepartTime = searchTime;
        let flights = await flightModel.find({
            $and: [{ flightFrom: inputData.bookingFrom }, { flightDestination: inputData.bookingDestination }, {
                $or: [{ 'flightDate.year': { $gt: inputData.bookingDepartTime.year } },
                    {
                        $and: [{ 'flightDate.month': { $gte: inputData.bookingDepartTime.month } }, { 'flightDate.day': { $gte: inputData.bookingDepartTime.day } }]
                    }
                ]
            }, { seatTypeBoughts: { $elemMatch: { seatType: inputData.bookingSeatClass } } }]
        });
        let fromLocations = await airportModel.findOne({ airportName: inputData.bookingFrom });
        let toLocations = await airportModel.findOne({ airportName: inputData.bookingDestination });
        let result = [];
        for (flight of flights) {
            for (let i = 0; i < flight.seatTypeBoughts.length; i++) {
                if (flight.seatTypeBoughts[i].quantity < flight.seatTypeBoughts[i].max && flight.seatTypeBoughts[i].seatType === inputData.bookingSeatClass) {
                    let temp = {
                        flightId: flight.flightId,
                        fromLocation: fromLocations.locationName,
                        toLocation: toLocations.locationName,
                        flightTime: flight.flightTime,
                        seatType: flight.numberOfSeatTypes[i],
                        price: flight.priceOfSeats[i],
                        fromLocationCode: fromLocations.locationCode,
                        toLocationCode: toLocations.locationCode,
                        flightDepartTime: flight.flightDepartTime,
                        flightDate: flight.flightDate,
                        fromAirport: inputData.bookingFrom,
                        toAirport: inputData.bookingDestination,
                        flightName: flight.flightName,
                        seatType: inputData.bookingSeatClass,
                    }
                    caculateTime(temp);
                    result.push(temp);
                }
            }
        }
        return result;
    } catch (Err) {
        return Err;
    }
}

module.exports = {
    caculateTime,
    format
}