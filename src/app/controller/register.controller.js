const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');
const emailService = require('../../services/email.service');


module.exports.getRegister = (req, res) => {
    res.render('homepage/register/register.ejs');
}

module.exports.getVerify = async(req, res) => {
    res.redirect('/');
}

module.exports.postRegister = async(req, res) => {

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
    try {
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