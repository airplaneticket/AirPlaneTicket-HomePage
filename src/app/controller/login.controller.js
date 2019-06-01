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
                error: "Không tìm thấy email"
            });
            return;
        }
        user.isRightPassword(inputData.password)
            .then((isMatch) => { //nhan lai 1 bien boolean kiem tra password co dung khong
                if (isMatch) {
                    if (user.active === true) {
                        req.session.user = user;
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                        res.redirect('/');
                    } else {
                        res.render('homepage/login/login.ejs', {
                            inputData: inputData,
                            error: "Tài khoản chưa được kích hoạt. Kiểm tra mail để kích hoạt tài khoản"
                        });
                    }
                } else {
                    res.render('homepage/login/login.ejs', {
                        inputData: inputData,
                        error: 'Sai mật khẩu'
                    });
                    return;
                }
            });
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Có lỗi xảy ra. Hãy tải lại trang');
    }
}