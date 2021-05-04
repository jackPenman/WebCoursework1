const path = require('path');
const public = path.join(__dirname, '../views');
const userDao = require('../models/user.js');
const userdb = new userDao("user.db");


exports.new_user_page = function (req, res) {
    res.render('register');
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userdb.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userdb.create(user, password);
        res.redirect('/login');
    });
}