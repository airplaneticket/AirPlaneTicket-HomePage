const express = require('express');

const bookingController = require('../../controller/booking.controller')

const router = express.Router();

router.get('/', bookingController.getBooking);

router.post('/', bookingController.postBooking);

module.exports = router;