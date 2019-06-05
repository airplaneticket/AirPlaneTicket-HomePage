const express = require('express');

const profileController = require('../../controller/profile.controller');
const profileMiddleware = require('../../middleware/profile.middleware')
const router = express.Router();

router.get('/', profileController.getProfile);
router.post('/', profileMiddleware.postProfile, profileController.postProfile);

module.exports = router;