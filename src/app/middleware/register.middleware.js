const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');

module.exports.postRegister = async(req, res, next) => {
    try {
        let inputData = {
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            fullname: req.body.registerFullname,
            identityNumber: req.body.registerIdentityNumber,
            phone: req.body.registerPhone,
            age: req.body.registerAge,
            gender: req.body.registerGender,
            address: req.body.registerAddress
        }
        let user = await userModel.findOne({ email: inputData.email });
        if (user) {
            res.render('homepage/register/register.ejs', {
                notify: 'Email này đã được đăng kí',
                inputData: inputData
            });
            return;
        }
        if (inputData.password.length < 8) {
            res.render('homepage/register/register.ejs', {
                notify: 'Mật khẩu phải nhiều hơn 8 kí tự',
                inputData: inputData
            });
            return;
        }
        req.inputData = inputData;
        next();
    } catch (err) {
        res.status(400);
        res.send('Server ERROR');
    }


}

module.exports.getVerify = async(req, res, next) => {
    try {
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
    } catch (err) {
        res.status(404);
        res.send('404 error');
    }
}