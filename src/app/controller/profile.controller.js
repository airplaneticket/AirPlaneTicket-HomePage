const userModel = require('../../models/user.model');
const _ = require('lodash');
module.exports.getProfile = (req, res) => {
    res.render('homepage/profile/profile.ejs', {
        user: req.session.user
    });
}
module.exports.postProfile = async(req, res) => {
    let newProfileData = req.newProfileData;
    userModel.findById(req.session.user._id, async function(err, doc) {
        if (err) {
            console.log(err);
        }
        _.assign(doc, newProfileData);
        doc.save();
        req.session.user = await userModel.findById(req.session.user._id);
        res.render('homepage/profile/profile.ejs', {
            notify: 'Cập nhật thông tin thành công',
            user: req.session.user
        });
    });
}