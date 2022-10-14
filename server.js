const express = require("express");
const app = express();
// const path = require('path');
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

// set the middleware

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false })); // helps us to send our details i.e from email/password in register.ejs

app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // to display flash messages

app.use(cookieParser());


// history of messages

let history = [];

app.post('/messages', (req, res) => {
    let text = req.body.message
    history.push(text)
    console.log(text)
    res.render("chat-dashboard", { user: req.user.name, history: history });
});

// generate dialogId

app.post('/messages: dialogID', (req, res) => {
    let dialogID = user1.id + user2.id;
    user1.id = req.user1.name;
    user2.id = req.user2.name;
    console.log(dialogID);
    res.render("dialogID")

})

// create an upload form to share files with formidable



// set the different pages requirements

app.get("/", (req, res) => {
    res.render("index") // res.send("Hello");

});

app.get("/users/register", checkAuthenticated, (req, res) => {
    res.render("register");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
    res.render("login");
});

app.get("/users/chat-dashboard", checkNotAuthenticated, (req, res) => {
    res.render("chat-dashboard", { user: req.user.name, history: history });
    // res.download("server.js")
});

app.get("/users/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "You have logged out");
    res.redirect("/users/login");
});

app.post('/users/register', async(req, res) => {

    let { name, email, password, password2 } = req.body;
    const entry = email.toLowerCase(); // all emails should be lower case
    // console.log({ name, entry, password, password2 });
    let errors = [];

    if (!name || !entry || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
        errors.push({ message: "The password should be at least 6 characters" });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.render("register", { errors });
    } else {
        // Form validation has passed

        let hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log("reaches here");
                // console.log(results.rows); // will return values if we have them in the db
                if (results.rows.length > 0) {
                    errors.push({ message: "Email already registered" });
                    res.render("register", { errors })
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err
                            }
                            console.log(results.rows);
                            req.flash('success_msg', "You are now registered. Please log in.");
                            res.redirect("/users/login");
                        }
                    )
                }
            }
        );
    }
});

app.post("/users/login", passport.authenticate("local", {
    successRedirect: "/users/chat-dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
}));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return (res.redirect("/users/chat-dashboard"));
    }
    next();
};

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});