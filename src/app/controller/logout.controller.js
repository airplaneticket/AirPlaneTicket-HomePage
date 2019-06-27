module.exports.getLogout = (req, res) => {
    req.session.destroy();
    res.clearCookie("userSessionId");
    res.redirect('/');
}