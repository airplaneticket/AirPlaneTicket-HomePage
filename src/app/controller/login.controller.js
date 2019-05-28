const authModel = require('../../models/auth.model')

module.exports.login = function(req, res) {
    res.render('homepage/login/login.ejs');
}

module.exports.postLogin = async function(req, res) {
    let username = req.body.loginUsername;
    let password = req.body.loginPassword;
    let inputData = {
        username: username,
        password: password
    }
    let user = await authModel.find({ username: username });
    if (user.length <= 0) {
        res.render('homepage/login/login.ejs', {
            inputData: inputData,
            usernameError: 'Username not found'
        });
        return;
    }
    user[0].isRightPassword(password)
        .then((isMatch) => { //nhan lai 1 bien boolean kiem tra password co dung khong
            if (isMatch) {
                if (user[0].active === true) {
                    req.session.user = user[0];
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                    res.redirect('/');
                } else {
                    res.render('homepage/login/login.ejs', {
                        inputData: inputData,
                        activeError: "Your account hasn't actived. Please check your email"
                    });
                }
            } else {
                res.render('homepage/login/login.ejs', {
                    inputData: inputData,
                    passwordError: 'Wrong password!'
                });
                return;
            }
        });
}