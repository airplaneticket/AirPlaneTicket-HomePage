const flightModel = require('../../models/flight.model');
const dateTimeServices = require('../../services/date-time.services');
const moment = require('moment');

module.exports.postSearchBooking = async(req, res) => {
    let inputData = {
        from: req.body.bookingFrom,
        destination: req.body.bookingDestination,
        departTime: req.body.bookingDepartTime,
        returnTime: req.body.bookingReturnTime,
        seatClass: req.body.bookingSeatClass,
    }
    console.log(moment(dateTimeServices.getCurrentDate()).format('DD MM YYYY'));
    if (req.body.bookingFlightType === 'oneWayTicket') {
        for (data in inputData) {
            if (inputData[data] == '') {
                delete inputData[data];
            }
        }
        let flight = await flightModel.find({ inputData, departTime: { $gte: dateTimeServices.getCurrentDate() } });
    }
    res.render('homepage/booking/booking.ejs', {
        searchData: inputData
    });
}