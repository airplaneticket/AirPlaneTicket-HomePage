const express = require('express');

const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

//GET

router.get('/login', authMiddleware.notRequireLogin, authController.login);

router.get('/register', authController.register);

router.get('/logout', authController.logout);

router.get('/forgotpassword', authController.forgotPassword);

router.get('/view', authMiddleware.requireLogin, authController.viewUser);

router.get('/verify/:hash', authController.verify);

//POST

router.post('/login', authController.postLogin);

router.post('/register', authController.postRegister);

router.post('/forgotpassword', authController.postForgotPassword);


module.exports = router => {
    router.use('/login');
    router.use('/register');
}