const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'views');
const controller = require('../controllers/activityTrackerController.js');


const app = express();
const router = express.Router();

app.use(express.static(public));

app.get('/', controller.landing_page)

router.get('/add', function (req, res) {
    res.send('<h1>add page Messages</h1>');
})

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;
