const userModel = require('../../models/user.model');
const verifyUserModel = require('../../models/verifyUser.model');
const emailService = require('../../services/email.service');


module.exports.getRegister = (req, res) => {
    res.render('homepage/register/register.ejs');
}

module.exports.getVerify = async(req, res) => {
    let hash = req.params.hash;
    try {
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
        // res.render('notify.ejs', {
        //     notify: "Your account was actived! You can login now!"
        // });
        res.redirect('/login');
        console.log('done');
    } catch (err) {
        res.status(404);
        res.send('404');
        console.log(err);
    }



    // try {
    //     let verifyUser = await verifyUserModel.findOne({ hash: verifyHash });
    //     if (verifyUser) {
    //         userModel.updateOne({ _id: verifyUser.userId }, { $set: { actived: true } }, (err) => {
    //             if (err) {
    //                 res.status(400);
    //                 res.send('sorry but something wrong');
    //                 console.log(err);
    //                 return;
    //             }
    //             verifyUserModel.deleteOne({ _id: verifyUser._id }, (err) => {
    //                 if (err) {
    //                     res.status(400);
    //                     res.send('sorry but something wrong');
    //                     console.log(err);
    //                     return;
    //                 }
    //                 res.redirect('/');
    //                 console.log('notify account active');
    //             })
    //         });
    //         res.send('your account was actived');
    //         return;
    //     } else {
    //         res.status(404);
    //         res.send('not found');
    //     }
    // } catch (err) {
    //     res.status(400);
    //     res.send('sorry but something wrong');
    // }

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
        let user = await userModel.findOne({ email: inputData.email });
        console.log(user);
        if (user) {
            res.render('homepage/register/register.ejs', {
                error: 'email existed',
                inputData: inputData
            });
            console.log('email existed notify'); // them layout hien thong bao
            return;
        }
        if (inputData.password.length < 8) {
            res.render('homepage/register/register.ejs');
            console.log('wrong password notify', {
                error: 'wrong password',
                inputData: inputData
            }); // them layout hien thong bao
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