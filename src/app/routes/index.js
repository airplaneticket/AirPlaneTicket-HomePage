module.exports = routes => {
    routes.use('/login', require('./login/index'));
    routes.use('/register', require('./register/index'));
}
