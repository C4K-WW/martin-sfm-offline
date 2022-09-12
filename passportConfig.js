const localStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) { // to initialise the local strategy
    const authenticateUser = (email, password, done) => {
        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);
            if (results.rows.length > 0) { // if the username is found in the db
                const user = results.rows[0]; // pass the user object to the db

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password is not correct" });
                    }
                });
            } else { // if no users are found in the db
                return done(null, false, { message: "Email is not registered" });
            }
        });
    };

    passport.use(new localStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.id)); // store the 

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                throw err;
            }
            return done(null, results.rows[0]); // store the user objects in a session
        });
    });
}

module.exports = initialize;