const messages = require("../data/messages");

function timez() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let chatTime = h + ":" + m + ":" + s;
    let timeStamp = chatTime.toString();
    return timeStamp
}


module.exports = timez;