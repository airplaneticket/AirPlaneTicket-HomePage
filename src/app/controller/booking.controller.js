module.exports.postSearchBooking = async(req, res) => {
    let inputData = {
        from: req.body.bookingFrom,
        destination: req.body.bookingDestination,
        departTime: req.body.bookingDepartTime,
        returnTime: req.body.bookingReturnTime,
        numberOfCustomer: req.body.bookingNumberOfCustomer,
        seatClass: req.body.bookingSeatClass,
    }
    for (property in inputData) {
        if (inputData[property] === '') {
            delete inputData[property];
        }
    }
    console.log(inputData);
    res.render('homepage/booking/booking.ejs', {
        searchData: inputData
    });
}