module.exports.postProfile = (req, res, next) => {
    let inputData = {
        email: req.body.profileEmail,
        password: req.body.profilePassword,
        fullname: req.body.profileFullname,
        identityNumber: req.body.profileIdentityNumber,
        age: req.body.profileAge,
        gender: req.body.profileGender,
        phone: req.body.profilePhone,
        address: req.body.profileAddress
    }
    let user = req.session.user;
    if (inputData.fullname !== user.fullname ||
        inputData.identityNumber !== user.fullname ||
        inputData.age !== user.age ||
        inputData.gender !== user.gender ||
        inputData.phone !== user.phone ||
        inputData.address !== user.address
    ) {
        if (inputData.password !== '') {
            if (inputData.password.length > 8) {
                req.newProfileData = inputData;
                next();
            } else {
                res.render('homepage/profile/profile.ejs', {
                    notify: 'Mật khẩu phải nhiều hơn 8 kí tự',
                    user: user
                });
            }
        } else {
            inputData.password = req.session.user.password;
            req.newProfileData = inputData;
            next();
        }
    } else {
        res.render('homepage/profile/profile.ejs', {
            notify: 'Hãy chỉnh sửa thông tin để cập nhật',
            user: user
        });
    }
}