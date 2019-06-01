const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');

module.exports.postRegister = async(req, res, next) => {
    let user = await userModel.findOne({ email: req.body.registerEmail });
    if (user) {
        res.render('homepage/register/register.ejs', {
            error: 'Email này đã được đăng kí'
        });
        console.log('email existed notify'); // them layout hien thong bao
    }
    if (inputData.password.length < 8) {
        res.render('homepage/register/register.ejs');
        console.log('wrong password notify', {
            error: 'Mật khẩu phải nhiều hơn 8 kí tự'
        }); // them layout hien thong bao
    }
    next();
}

module.exports.getVerify = async(req, res, next) => {
    let hash = req.params.hash;
    let verifyUser = await verifyUserModel.findOne({ hash: hash });
    userModel.updateOne({ _id: verifyUser.userId }, { $set: { active: true } }, function(err) {
        if (err) {
            console.log(err);
            res.send('err');
        }
    });
    verifyUserModel.deleteOne({ userId: verifyUser.userId }, function(err) {
        if (err) {
            console.log(err);
            res.send('err');
        }
    });
    next();
}