const express = require('express');
const router = express.Router();

router.get('/profile',(req,res) => {
    res.render('homepage/profile/index.ejs');
});

module.exports = router;