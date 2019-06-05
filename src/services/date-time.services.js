module.exports.getCurrentDate = () => {
    let today = new Date().getTime();
    return new Date(today)
}

module.exports.stringToDate = (string) => {
    let time = new Date();
    let year = string.split(' ').join('').slice(4, 8);
    let month = parseInt(string.split(' ').join('').slice(2, 4)) - 1;
    let day = parseInt(string.split(' ').join('').slice(0, 2));
    return new Date(year, month, day, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
}