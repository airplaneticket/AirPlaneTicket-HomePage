const seatTypeModel = require('../../models/seatType.model');
const airPortModel = require('../../models/airPort.model');
const flightModel = require('../../models/flight.model');

const moment = require('moment');
const _ = require('lodash');

module.exports.getIndex = async(req, res, next) => {
    try {
        let seatType = await seatTypeModel.find({});
        let airPort = await airPortModel.find({});
        req.seatType = seatType;
        req.airPort = airPort;
        next();
    } catch (err) {
        res.status(400);
        res.send("some thing wrong");
        console.log(err);
    }
}

module.exports.postSearch = async(req, res, next) => {
    let inputData = {
        ...req.body
    };
    let inputTime = inputData.bookingDepartTime.split('-');
    let checkTime = '';
    let seatType = await seatTypeModel.find({});
    let airPort = await airPortModel.find({});
    let err;
    for (let i = inputTime.length - 1; i >= 0; i--) {
        checkTime += inputTime[i];
    }
    let now = moment();
    let check = moment(checkTime);
    if (_.isEmpty(inputData.bookingDepartTime)) {
        err = 'Vui lòng chọn thời gian khởi hành';
    }
    if (check.isBefore(now)) {
        err = "Vui lòng chọn ngày khởi hành lớn hơn ngày hiện tại";
    }
    if (_.isEqual(inputData.bookingFrom, inputData.bookingDestination)) {
        err = "Vui lòng chọn nơi khởi hành khác nơi đi khác nơi đến";
    }
    if (typeof err === 'string') {
        res.render('homepage/index.ejs', {
            seatType,
            airPort,
            notify: err
        });
        return;
    } else {
        req.inputData = inputData;
        next();
    }

}