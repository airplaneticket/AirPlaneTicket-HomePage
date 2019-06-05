const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');
const emailService = require('../../services/email.service');


module.exports.getRegister = (req, res) => {
    res.render('homepage/register/register.ejs');
}

module.exports.getVerify = async(req, res) => {
    res.render('homepage/login/login.ejs', {
        notify: 'Tài khoản đã được kích hoạt bạn có thể đăng nhập để sử dụng dịch vụ!'
    })
}

module.exports.postRegister = async(req, res) => {
    try {
        let newUser = new userModel(req.inputData);
        let verifyUser = new verifyUserModel();
        let password = newUser.password;
        newUser.save();
        verifyUser.input(newUser._id)
        verifyUser.save();
        emailService.sendMailVerify(newUser.email, verifyUser.hash, password, res);
        res.render('homepage/index.ejs', {
            notify: 'Vui lòng kiểm tra email để kích hoạt tài khoản!'
        });
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Sorry but something wrong!');
    }
}