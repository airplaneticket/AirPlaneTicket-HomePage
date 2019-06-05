const pageMiddleware = require('../middleware/system.middleware');
module.exports = routes => {
    routes.use(pageMiddleware.hasSessionNotFoundUser);
    routes.use('/', require('./homepage/index'));
    routes.use('/login', require('./login/login.routes'));
    routes.use('/register', require('./register/register.routes'));
<<<<<<< HEAD
    routes.use('/', require('./booking/index'));
    routes.use('/', require('./payment/index'));
    routes.use(pageMiddleware.requireLogin);
    routes.use('/', require('./profile/index'));
=======
    routes.use('/booking', require('./booking/booking.routes'));
    routes.use(pageMiddleware.requireLogin);
    routes.use('/profile', require('./profile/profile.routes'));

>>>>>>> 30f2298fba351e1571807ac105fbf93d29a17be0
    routes.use((req, res) => {
        res.status(404);
        res.send('404 ERROR');
    })
}