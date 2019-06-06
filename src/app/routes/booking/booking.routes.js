const express = require('express');

const bookingController = require('../../controller/booking.controller')

const router = express.Router();

router.get('/bookingonesearch', bookingController.getBooking);

module.exports = router;