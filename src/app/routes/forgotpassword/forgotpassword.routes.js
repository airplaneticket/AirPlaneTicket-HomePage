const express = require('express');
const router = express.Router();

router.get('/forgotpassword', (req, res) => {
    res.render('homepage/forgotPassword/forgotPassword')
})

module.exports = router;