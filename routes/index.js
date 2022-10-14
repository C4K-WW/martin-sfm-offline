const express = require("express");
const router = express.Router();
const messages = require("../data/messages");
let timeStamp = require("../data/time");
// const nickname = require("../data/nickname");

router.get("/", function(req, res, next) {
    console.log("reaching here");
    res.render("index");
});

router.post("/", function(req, res, next) {
    console.log("reaching here");
    //nickname = req.body.nickname;
    res.redirect(`/chat?nickname=${req.body.nickname}`);
    //res.render("chat", { messages });
});

// router.get("/:ID", function (req, res, next) {
//   res.render("chat", {});
// });

module.exports = router;