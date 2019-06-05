const express = require('express');

const bookingController = require('../../controller/booking.controller')

const router = express.Router();

router.post('/', bookingController.postSearchBooking);


module.exports = router;