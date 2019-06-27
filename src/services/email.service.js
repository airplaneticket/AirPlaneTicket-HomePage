const nodemailer = require('nodemailer');

module.exports.sendMailVerify = function(email, hash, password, res) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ADMIN_EMAIL_USERNAME,
            pass: process.env.ADMIN_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'AirPlaneTicket PhongDuy mailbox', // sender address
        to: email, // list of receivers
        subject: 'Xác thực tài khoản P/D Airline',
        html: '<p><b>Vui lòng bấm vào đường dẫn để xác thực tài khoản:</b> http://localhost:' + process.env.PORT + '/register/verify/' + hash + '</p>'
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            res.status(500).send(err);
    });

}

module.exports.sendMailForgotPassword = function(email, password, res) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ADMIN_EMAIL_USERNAME,
            pass: process.env.ADMIN_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'AirPlaneTicket PhongDuy mailbox', // sender address
        to: email, // list of receivers
        subject: 'Phản hồi quên mật khẩu P/D Airline', // Subject line
        html: '<p><b>Mật khẩu mới của bạn là: </b>' + password + '</p>' // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            res.status(500).send(err);
    });

}


module.exports.sendMailTicket = function(email, ticket, res) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ADMIN_EMAIL_USERNAME,
            pass: process.env.ADMIN_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'AirPlaneTicket PhongDuy mailbox', // sender address
        to: email, // list of receivers
        subject: 'Thông tin đặt vé P/D Airline', // Subject line
        html: '<p> Bạn đã đặt ' + ticket.numberOfCustomer + ' vé máy bay.<br>Sân bay đi: ' + ticket.flightFrom + '<br>Sân bay đến: ' + ticket.flightDestination + '<br>Thời gian khởi hành: ' +
            ticket.flightDepartTime + '<br>Ngày: ' + ticket.flightDate + '<br>Hạng ghế: ' + ticket.seatType + '<br>Tổng số tiền thanh toán: ' + ticket.totalPrice + 'VND' +
            '<br>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi' + '</p>' // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        }
    });

}