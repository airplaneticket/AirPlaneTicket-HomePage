const express = require('express');

const bookingController = require('../../controller/booking.controller')

const router = express.Router();

router.get('/booking', bookingController.getBooking);

module.exports = router;