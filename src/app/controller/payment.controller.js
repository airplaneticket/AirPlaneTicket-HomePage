const ticketModel = require('../../models/ticket.model');
const flightModel = require('../../models/flight.model');

const emailService = require('../../services/email.service');

module.exports.getPayment = async(req, res) => {
    let inputData = {...req.body };
    let tempTime = inputData.flightDate.split(' ');
    inputData.totalPrice = parseInt(inputData.price) * parseInt(inputData.numberOfCustomer)
    inputData.flightDate = tempTime[0] + ' Tháng ' + tempTime[1] + ' ' + tempTime[2];
    inputData.userId = req.session.user._id;
    inputData.email = req.session.user.email;
    res.render('homepage/payment/payment.ejs', {
        ticketData: inputData
    });
}

module.exports.postConfirm = async(req, res) => {
    let inputData = {...req.body };
    inputData.price = parseInt(inputData.price);
    let flight = await flightModel.findOne({ flightId: inputData.flightId });
    flight = flight.toObject();
    flight.totalPrice = inputData.totalPrice;
    flight.numberOfCustomer = inputData.numberOfCustomer;
    flight.flightDate = inputData.flightDate;
    for (let i = 0; i < inputData.numberOfCustomer; i++) {
        let ticket = new ticketModel(inputData);
        await ticket.save();
        await ticket.saveForReport(ticket);
    }
    emailService.sendMailTicket(inputData.email, flight, res);
    res.redirect('/');
}