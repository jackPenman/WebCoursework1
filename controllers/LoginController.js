const UserDao = require('../models/user');
const path = require('path');
const public = path.join(__dirname, '../views');
const dao = new UserDao("database.db");

exports.login_page = function (req, res) {
    res.render('loginForm');
}

exports.post_login = function (req, res) {
    console.log("login attempted");
    res.redirect("/");
}; 