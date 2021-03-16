const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'views');
const HomeController = require('../controllers/WeeklyController.js');
const LoginController = require('../controllers/LoginController.js');


const app = express();
const router = express.Router();

app.use(express.static(public));

router.get('/', HomeController.landing_page)
router.post('/add', HomeController.post_new_entry);
router.get('/login', LoginController.login_page)
router.get('/add', HomeController.addActivity)
router.get('/profile', function (req, res) {
    res.send("user profile page, will display information relating to current logged in user");
})

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send(err);
})


module.exports = router;
