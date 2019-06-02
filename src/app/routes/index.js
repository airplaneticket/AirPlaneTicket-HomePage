const pageMiddleware = require('../middleware/system.middleware');
module.exports = routes => {
    routes.use(pageMiddleware.hasSessionNotFoundUser);
    routes.use('/', require('./homepage/index'));
    routes.use('/login', require('./login/login.routes'));
    routes.use('/register', require('./register/register.routes'));
    routes.use('/', require('./booking/index'));
    routes.use('/', require('./payment/index'));
    routes.use(pageMiddleware.requireLogin);
    routes.use('/', require('./profile/index'));
    routes.use((req, res) => {
        res.status(404);
        res.send('404 ERROR');
    })
}