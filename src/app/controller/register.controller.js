const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');
const emailService = require('../../services/email.service');


module.exports.getRegister = (req, res) => {
    res.render('homepage/register/register.ejs');
}

module.exports.getVerify = async(req, res) => {
    let verifyHash = req.params.hash;
    try {
        let checkVerifyUser = verifyUserModel.findOne({ hash: verifyHash });
        if (checkVerifyUser) {
            res.send('your account was actived');
            return;
        } else {
            res.send('404');
        }
    } catch (err) {
        res.status(400);
        res.send('sorry but something wrong');
    }

}

module.exports.postRegister = async(req, res) => {

    let inputData = {
        email: req.body.registerEmail,
        password: '123456789',
        fullname: req.body.registerFullname,
        identityNumber: req.body.registerIdentityNumber,
        phone: req.body.registerPhone,
        age: req.body.registerAge,
        gender: req.body.registerGender,
        address: req.body.registerAddress + ',' + req.body.registerCity + ',' + req.body.registerCountry
    }
    try {
        let user = await userModel.find({ email: inputData.email });
        console.log(user);
        if (user.length > 0) {
            res.render('homepage/register/register.ejs');
            console.log('err 1'); // them layout hien thong bao
            return;
        }
        if (inputData.password.length < 8) {
            res.render('homepage/register/register.ejs');
            console.log('err 2'); // them layout hien thong bao
            return;
        }
        let newUser = new userModel(inputData);
        let verifyUser = new verifyUserModel();
        let password = newUser.password;
        newUser.hashPassword()
            .then(() => {
                newUser.save();
                verifyUser.input(newUser._id)
                verifyUser.save();
                emailService.sendMailVerify(newUser.email, verifyUser.hash, password, res);
                res.redirect('/'); // them layout hien thong bao
                console.log('done');
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Sorry but something wrong!');
    }

}