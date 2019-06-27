const systemMiddleware = require('../middleware/system.middleware');
module.exports = routes => {
    routes.use(systemMiddleware.hasSessionNotFoundUser);
    routes.use('/login', require('./login/login.routes'));
    routes.use('/register', require('./register/register.routes'));
    routes.use(systemMiddleware.requireLogin);
    routes.use('/', require('./forgotpassword/forgotpassword.routes'))
    routes.use('/', require('./homepage/index'));
    routes.use('/profile', require('./profile/profile.routes'));
    routes.use('/payment', require('./payment/index'))
    routes.use((req, res) => {
        res.status(404);
        res.send('404 ERROR');
    })
}