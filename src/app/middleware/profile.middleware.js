module.exports.postProfile = (req, res) => {
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
    )
}