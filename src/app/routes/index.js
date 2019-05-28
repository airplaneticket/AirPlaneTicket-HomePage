module.exports = routes => {
    routes.use('/login', require('./login/index'));
}
