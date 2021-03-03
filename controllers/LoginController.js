const userDAO = require('../models/User');
const path = require('path');
const public = path.join(__dirname, '../views');
const db = new userDAO();

exports.login_page = function (req, res) {
    db.init();
    db.getAllEntries();
    res.sendFile(path.join(public, 'loginForm.html'));
} 