module.exports = routes => {
    routes.use('/login', require('./login/login.routes'));
    routes.use('/register', require('./register/register.routes'));
    routes.use('/', require('./profile/index'));
    routes.use('/', require('./booking/index'));
    routes.use('/', require('./homepage/index'));
}