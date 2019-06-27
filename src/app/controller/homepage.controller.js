const moment = require('moment');

const airportModel = require('../../models/airPort.model');
const seatTypeModel = require("../../models/seatType.model");

const service = require('../../services/booking.services')

module.exports.postSearch = async(req, res) => {
    inputData = req.inputData;
    let seatType = await seatTypeModel.find({});
    let airPort = await airportModel.find({});
    let search = await service.format(inputData);
    if (search.length <= 0) {
        res.render('homepage/index.ejs', {
            seatType,
            airPort,
            notify: 'Không có chuyến bay nào phù hợp'
        });
    } else {
        res.render('homepage/index.ejs', {
            search,
            option: {
                numberOfCustomer: inputData.numberOfCustomer,
                seatType: inputData.bookingSeatClass
            },
            seatType,
            airPort
        });
    }
}

module.exports.getIndex = async(req, res) => {
    res.render('homepage/index.ejs', {
        seatType: req.seatType,
        airPort: req.airPort,
    });
}