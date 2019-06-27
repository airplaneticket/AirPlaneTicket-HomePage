const express = require('express');
const router = express.Router();

const paymentController = require('../../controller/payment.controller');

router.post('/', paymentController.getPayment);

router.post('/confirm', paymentController.postConfirm)

module.exports = router