const express = require('express');
const router = express.Router();

router.get('/payment', (req,res) => {
    res.render('homepage/payment/payment.ejs');
})

module.exports = router