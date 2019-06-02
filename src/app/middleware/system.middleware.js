module.exports.requireLogin = async function(req, res, next) {
    if (req.session.user && req.signedCookies.userSessionId)
        next();
    else
        res.render('homepage/login/login.ejs', {
            notify: 'Vui lòng đăng nhập để sử dụng dịch vụ'
        });
}


module.exports.hasSessionNotFoundUser = function(req, res, next) {
    if (req.signedCookies.userSessionId && typeof req.session.user === 'undefined')
        res.clearCookie('userSessionId');
    next();
}

module.exports.notLogin = (req, res, next) => {
    if (!req.session.user && !req.signedCookies.userSessionId)
        next();
    else
        res.redirect('/');
}