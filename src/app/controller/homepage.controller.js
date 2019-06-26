const moment = require('moment');

const flightModel = require('../../models/flight.model');
const airportModel = require('../../models/airPort.model');

module.exports.postSearch = async(req, res) => {
    inputData = req.inputData;
    let flights = await flightModel.find({}).and({ flightFrom: inputData.bookingFrom }, { flightDestination: inputData.bookingDestination }, {
        $or: [{ 'flightDate.year': { $gte: inputData.bookingDepartTime.year } },
            {
                $and: [{ 'flightDate.month': { $gte: inputData.bookingDepartTime.month } }, { 'flightDate.day': { $gte: inputData.bookingDepartTime.day } }]
            }
        ]
    });
    let result = [];
    for (flight of flights) {
        for (let i = 0; i < flight.numberOfSeatTypes.length; i++) {
            if (flight.numberOfSeatTypes[i] === inputData.bookingSeatClass) {
                result.push(flight);
            }
        }
    }
    console.log(result);
    res.redirect('/');
}

module.exports.getIndex = async(req, res) => {
    res.render('homepage/index.ejs', {
        seatType: req.seatType,
        airPort: req.airPort,
    });
}
5