module.exports.postSearchBooking = (req, res) => {
    let inputData = {
        flightType: req.body.bookingFlightType,
        from: req.body.bookingFrom,
        destination: req.body.bookingDestination,
        departTime: req.body.bookingDepartTime,
        returnTime: req.body.bookingReturnTime,
        numberOfCustomer: req.body.bookingNumberOfCustomer,
        seatClass: req.body.bookingSeatClass,
    }
    res.render('homepage/booking/booking.ejs', {
        searchData: inputData
    });
}