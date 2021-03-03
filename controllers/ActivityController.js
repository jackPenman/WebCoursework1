const activityDAO = require('../models/Activity');
const path = require('path');
const public = path.join(__dirname, '../views');
const db = new activityDAO();

exports.landing_page = function (req, res) {
    db.init();
    res.sendFile(path.join(public, 'homePage.html'));
    db.getAllEntries();
} 