const express = require('express');

const registerController = require('../../controller/register.controller');

const router = express.Router();

router.get('/', registerController.getregister);

router.get('/verify/:hash', registerController.getVerify)

router.post('/', registerController.postRegister);


module.exports = router;