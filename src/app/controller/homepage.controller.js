module.exports.getIndex = async(req, res) => {
    res.render('homepage/index.ejs', {
        seatType: req.seatType,
        airPort: req.airPort,
    });
}