const userModel = require('../../models/user.model');


module.exports.getLogin = function(req, res) {
    res.render('homepage/login/login.ejs');
}


module.exports.postLogin = async function(req, res) {
    let inputData = {
        email: req.body.loginEmail,
        password: req.body.loginPassword
    }
    try {
        let user = await userModel.findOne({ email: inputData.email });
        console.log(user);
        if (!user) {
            res.render('homepage/login/login.ejs', {
                inputData: inputData,
                emailError: 'Email not found'
            });
            console.log('Email not found');
            return;
        }
        user.isRightPassword(inputData.password)
            .then((isMatch) => { //nhan lai 1 bien boolean kiem tra password co dung khong
                if (isMatch) {
                    if (user.active === true) {
                        req.session.user = user;
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                        res.redirect('/');
                        console.log('logined');
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
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('something wrong');
    }
}