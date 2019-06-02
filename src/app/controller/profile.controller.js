module.exports.getProfile = (req, res) => {
    res.render('homepage/profile/profile.ejs', {
        user: req.session.user
    });
}
module.exports.postProfile = async(req, res) => {

}