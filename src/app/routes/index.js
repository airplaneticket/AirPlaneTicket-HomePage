const systemMiddleware = require('../middleware/system.middleware');
module.exports = routes => {
    routes.use(systemMiddleware.hasSessionNotFoundUser);
    routes.use('/login', require('./login/login.routes'));
    routes.use('/register', require('./register/register.routes'));
    routes.use('/forgotpassword', require('./forgotpassword/forgotpassword.routes'))
    routes.use(systemMiddleware.requireLogin);
    routes.use('/', require('./homepage/index'));
    routes.use('/logout', require('./logout/logout.routes'))
    routes.use('/profile', require('./profile/profile.routes'));
    routes.use('/payment', require('./payment/index'))
}