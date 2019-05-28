const express = require('express');

const loginController = require('../../controller/login.controller');

const router = express.Router();

router.get('/login', loginController.login);

router.post('/login', loginController.postLogin);