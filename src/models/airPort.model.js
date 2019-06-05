const mongoose = require('mongoose');

let airPortSchema = new mongoose.Schema({
    airPortCode: {
        type: String,
        required: true
    },
    airPortName: {
        type: String,
        required: true
    },
    locationCode: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    }
});


let airPortModel = mongoose.model('airPortModel', airPortSchema, 'Airports');

module.exports = airPortModel;