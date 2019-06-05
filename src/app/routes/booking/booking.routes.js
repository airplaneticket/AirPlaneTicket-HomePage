const express = require('express');

const bookingController = require('../../controller/booking.controller')

const router = express.Router();

router.get('/bookingonesearch', bookingController.getBooking);

router.get('/bookingtwosearch', (req,res) => {
    res.render('homepage/booking/bookingTwoSearch.ejs')
})

module.exports = router;