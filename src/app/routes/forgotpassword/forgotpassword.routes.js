const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../../controller/forgotPassword.controller');
const forgotPasswordMiddleware = require('../../middleware/forgotPassword.midleware');

router.get('/', forgotPasswordController.getForgotPassword);
router.post('/', forgotPasswordMiddleware.postForgotPassword, forgotPasswordController.postForgotPassword);

module.exports = router;