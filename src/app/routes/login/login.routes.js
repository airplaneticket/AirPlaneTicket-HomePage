const express = require('express');

const authController = require('../../controller/auth.controller');

const router = express.Router();

router.get('/', authController.login);

router.post('/', authController.postLogin);

module.exports = router;