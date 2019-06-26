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
    for (let i = inputTime.length - 1; i >= 0; i--) {
        checkTime += inputTime[i];
    }
    let now = moment();
    let check = moment(checkTime);
    if (_.isEmpty(inputData.bookingDepartTime)) {
        console.log('lỗi không có ngày');
        req.flash('error', "Vui lòng chọn ngày khởi hành");
        res.redirect('/');
        return;
    }
    if (check.isBefore(now)) {
        console.log('lỗi ngày');
        req.flash('error', "Vui lòng chọn ngày khởi hành lớn hơn ngày hiện tại");
        res.redirect('/');
        return;

    }
    if (_.isEqual(inputData.bookingFrom, inputData.bookingDestination)) {
        console.log('loi trung noi di den');
        req.flash('error', "Vui lòng chọn nơi khởi hành khác nơi đi khác nơi đến");
        res.redirect('/');
        return;

    }
    let searchTime = inputData.bookingDepartTime.split('-');
    searchTime = {
        day: parseInt(searchTime[0]),
        month: parseInt(searchTime[1]),
        year: parseInt(searchTime[2])
    }
    inputData.bookingDepartTime = searchTime;
    req.inputData = inputData;
    next();
}