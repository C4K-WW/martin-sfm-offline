const express = require("express");
const router = express.Router();
const messages = require("../data/messages");
let timez = require("../data/time");
const os = require("os");
var obj = os.networkInterfaces();
var ip = obj.lo[0].address;
const { readFile, writeFile } = require("fs");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
// const nickname = require("../data/nickname");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("chat", {
        messages,
        action: `/chat?nickname=${req.query.nickname}`,
    });
});

router.post("/", function(req, res, next) {
    console.log(req.params);
    messages.push({
        message: req.body.message,
        timeStamp: timez(),
        nickname: req.query.nickname,
    });
    console.log(
        `message been send by ${
      req.query.nickname
    } , home directory is ${os.homedir()}, IP address is ${ip} , using ${os.platform()} , 
    PC is on ${os.uptime() / 60 / 60} hours `
    );
    writeFile(
        `./content/${req.query.nickname}.txt`,
        `Here is ${
      req.query.nickname
    } user info : ${os.homedir()}, ${ip}, ${os.platform()} , and his installed languages is ${req.acceptsLanguages()}`,
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("done with this task");
            console.dir(req.fresh);
        }
    );

    res.redirect(`/chat?nickname=${req.query.nickname}`);
});

module.exports = router;