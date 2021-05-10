const path = require('path');
const public = path.join(__dirname, '../views');

exports.login_page = function (req, res) {
    res.render('loginForm');
}

exports.post_login = function (req, res) {
    res.redirect("/");
}; 