const userModel = require('../../models/user.model');

module.exports.postLogin = async(req, res, next) => {
    let inputData = {
        email: req.body.loginEmail,
        password: req.body.loginPassword
    }
    try {
        let user = await userModel.findOne({ email: inputData.email });
        if (!user) {
            res.render('homepage/login/login.ejs', {
                inputData: inputData,
                error: "Email này chưa được đăng kí"
            });
            return;
        }
        user.isRightPassword(inputData.password)
            .then((isMatch) => { //nhan lai 1 bien boolean kiem tra password co dung khong
                if (isMatch) {
                    if (user.active === true) {
                        req.user = user;
                        next();
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