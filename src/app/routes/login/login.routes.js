const express = require('express');

const loginController = require('../../controller/login.controller');
const loginMiddleware = require('../../middleware/login.middleware');
const systemMiddleware = require('../../middleware/system.middleware')


const router = express.Router();

router.get('/', systemMiddleware.notLogin, loginController.getLogin);

router.post('/', loginMiddleware.postLogin, loginController.postLogin);

module.exports = router;