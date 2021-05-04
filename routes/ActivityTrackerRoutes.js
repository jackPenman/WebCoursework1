const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'views');
const HomeController = require('../controllers/WeeklyController.js');
const LoginController = require('../controllers/LoginController.js');
const LogoutController = require('../controllers/logoutController.js');
const RegisterController = require('../controllers/RegisterController.js');
const auth = require('../auth.js');
const { ensureLoggedIn } = require('connect-ensure-login');
const app = express();
const router = express.Router();
app.use(express.static(public));

router.get('/', ensureLoggedIn('/login'), HomeController.landing_page)
router.post('/add', ensureLoggedIn('/login'), HomeController.post_new_entry);
router.get('/plan', ensureLoggedIn('/login'), HomeController.addPlan);
router.post('/plan', ensureLoggedIn('/login'), HomeController.create_new_plan);
router.post('/register', RegisterController.post_new_user);
router.post("/login", auth.authorize("/login"), LoginController.post_login);
router.get('/register', RegisterController.new_user_page);
router.get('/login', LoginController.login_page)
router.get("/logout", ensureLoggedIn('/login'), LogoutController.logout);
router.get('/profile', ensureLoggedIn('/login'), function (req, res) {
    res.send("user profile page, will display information relating to current logged in user");
})

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

// router.use(function (err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send(err);
// })


module.exports = router;
