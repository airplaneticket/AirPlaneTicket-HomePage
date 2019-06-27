const express = require('express');
const logoutController = require('../../controller/logout.controller');
const router = express.Router();

router.get('/', logoutController.getLogout);

module.exports = router;