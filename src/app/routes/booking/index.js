const express = require('express');
const router = express.Router();

router.get('/booking',(req,res) => {
    res.render('homepage/booking/index.ejs');
});

module.exports = router;