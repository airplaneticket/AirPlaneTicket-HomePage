const seatTypeModel = require('../../models/seatType.model');
const airPortModel = require('../../models/airPort.model');

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