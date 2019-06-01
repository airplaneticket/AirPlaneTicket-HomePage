module.exports.requireLogin = async function(req, res, next) {
    if (req.session.user && req.signedCookies.userSessionId)
        next();
    else
        res.redirect('/login');
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