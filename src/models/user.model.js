const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let saltRound = 10;
let usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    identityNumber: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: Number
    },
    active: {
        type: Boolean,
        default: false
    },
    permission: {
        type: String,
        default: 'user'
    }
});

usersSchema.methods.hashPassword = async function() {
    return bcrypt.hash(this.password, saltRound)
        .then((hash) => {
            this.password = hash;
        });
}

usersSchema.methods.isRightPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

usersSchema.methods.forgotPassword = async function(hashString) {
    return bcrypt.hash(hashString, saltRound)
        .then((hash) => {
            this.password = hash;
        });
}

let userModel = mongoose.model('userModel', usersSchema, 'Users');

module.exports = userModel;