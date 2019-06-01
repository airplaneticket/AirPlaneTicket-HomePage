const express = require('express');

const registerController = require('../../controller/register.controller');
const registerMiddleware = require('../../middleware/register.middleware')
const systemController = require('../../middleware/system.middleware')
const router = express.Router();

router.get('/', systemController.notLogin, registerController.getRegister);

router.get('/verify/:hash', registerMiddleware.getVerify, registerController.getVerify)

router.post('/', registerMiddleware.postRegister, registerController.postRegister);


module.exports = router;