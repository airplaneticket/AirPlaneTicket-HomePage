const express = require('express');

const authController = require('../../controller/auth.controller');

const router = express.Router();

router.get('/', authController.register);

router.post('/', authController.postRegister);

module.exports = router;