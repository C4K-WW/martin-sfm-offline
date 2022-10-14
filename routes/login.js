var express = require("../node_modules/express");
var router = express.Router();

router.get("/", function(req, res, next) {
    console.log("login page loaded");
    res.render("login");
});

module.exports = router;