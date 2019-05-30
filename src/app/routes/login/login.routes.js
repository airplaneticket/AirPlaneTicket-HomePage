const express = require('express');

const loginController = require('../../controller/login.controller');

const router = express.Router();

router.get('/', loginController.getLogin);

router.post('/', loginController.postLogin);

module.exports = router;