const userModel = require('../../models/user.model');

module.exports.postLogin = async(req, res, next) => {
    try {
        let inputData = {
            email: req.body.loginEmail,
            password: req.body.loginPassword
        }
        let user = await userModel.find({ email: inputData.email });
        if (user.length <= 0) {
            res.render('homepage/login/login.ejs', {
                inputData: inputData,
                notify: "Email này chưa được đăng kí"
            });
            return;
        }
        user[0].isRightPassword(inputData.password)
            .then((isMatch) => { //nhan lai 1 bien boolean kiem tra password co dung khong
                if (isMatch) {
                    if (user[0].active === true) {
                        console.log('login');
                        req.user = user[0];
                        next();
                    } else {
                        res.render('homepage/login/login.ejs', {
                            inputData: inputData,
                            notify: "Tài khoản chưa được kích hoạt. Kiểm tra mail để kích hoạt tài khoản"
                        });
                    }
                } else {
                    res.render('homepage/login/login.ejs', {
                        inputData: inputData,
                        notify: 'Sai mật khẩu'
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