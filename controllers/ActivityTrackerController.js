
const path = require('path');
const public = path.join(__dirname, 'views');

exports.landing_page = function (req, res) {
    res.sendFile(path.join(public, 'index.html'));
} 