const userModel = require('../../models/user.model');
const _ = require("lodash");

const service = require('../../services/email.service');

module.exports.postForgotPassword = async(req, res) => {
    try {
        let resetUser = {
            password: Math.random().toString(36).substring(5),
            email: req.forgotEmail
        };
        let user = await userModel.findOne({ email: req.forgotEmail });
        _.assign(user, resetUser);
        await user.save();
        service.sendMailForgotPassword(req.forgotEmail, resetUser.password, res);
        res.render('homepage/forgotpassword/forgotPassword.ejs', {
            notify: "Xin kiểm tra email để lấy mật khẩu mới"
        });
    } catch (err) {
        console.log(err);
        res.send(500).status('Lỗi server hãy load lại trang');
    }
}

module.exports.getForgotPassword = (req, res) => {
    res.render('homepage/forgotPassword/forgotPassword')
}