const flightModel = require('../models/flight.model')
module.exports.findFlight = async(inputData, flightType) => {
    let findQuery;
    if (flightType === "oneWayTicket") {
        for (property in inputData) {
            if (property !== '') {
                console.log(inputData[property]);
                findQuery[property] = inputData[property];
            }
        }
    }
    for (i in findQuery) {
        console.log(i, ': ', findQuery[i])
    }
}