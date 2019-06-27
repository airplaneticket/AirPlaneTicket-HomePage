const userModel = require('../../models/user.model');



module.exports.postForgotPassword = async(req, res, next) => {
    let user = await userModel.findOne({ email: req.body.forgotEmail });
    if (!user) {
        res.render('homepage/forgotpassword/forgotPassword.ejs', {
            notify: "Không tìm thấy email hãy kiểm tra lại"
        })
    } else {
        req.forgotEmail = req.body.forgotEmail;
        next();
    }
}