const express = require('express');

const homepageController = require('../../controller/homepage.controller');
const homepageMiddleware = require('../../middleware/homepage.middleware');

const router = express.Router();

router.get('/', homepageMiddleware.getIndex, homepageController.getIndex);

router.post('/', homepageMiddleware.postSearch, homepageController.postSearch);

module.exports = router;