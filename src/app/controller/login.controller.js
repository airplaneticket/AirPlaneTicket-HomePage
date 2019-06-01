module.exports.getLogin = function(req, res) {
    res.render('homepage/login/login.ejs');
}

module.exports.postLogin = async function(req, res) {
    req.session.user = req.user;
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    res.redirect('/');
}