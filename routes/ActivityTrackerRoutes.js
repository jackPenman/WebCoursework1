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

// get handeling 
router.get('/', ensureLoggedIn('/login'), HomeController.landing_page);
router.get('/remove', ensureLoggedIn('/login'), HomeController.showRemovePage);
router.get('/register', RegisterController.new_user_page);
router.get('/login', LoginController.login_page)
router.get("/logout", ensureLoggedIn('/login'), LogoutController.logout);
router.get('/add', ensureLoggedIn('/login'), HomeController.get_new_entry);
router.get('/plan', ensureLoggedIn('/login'), HomeController.addPlan);
router.get('/profile', ensureLoggedIn('/login'), function (req, res) {
    res.send("user profile page, will display information relating to current logged in user");
})
router.get('/update', ensureLoggedIn('/login'), HomeController.showUpdatePage);
router.get('/progress', ensureLoggedIn('/login'), HomeController.showProgressPage);
router.get('/filter', ensureLoggedIn('/login'), HomeController.showFilterPage);

// post handeling
router.post('/filter', ensureLoggedIn('/login'), HomeController.filterGoals);
router.post('/update', ensureLoggedIn('/login'), HomeController.showOptionsForUpdate);
router.post('/progress', ensureLoggedIn('/login'), HomeController.showOptionsForProgress);
router.post('/progressGoal', ensureLoggedIn('/login'), HomeController.progressGoal);
router.post("/updateGoal", ensureLoggedIn('/login'), HomeController.updateGoal);
router.post("/updateGoalDetails", ensureLoggedIn('/login'), HomeController.updateGoalDetails);
router.post("/addProgressToGoal", ensureLoggedIn('/login'), HomeController.progressGoalWithReps);
router.post('/remove', ensureLoggedIn('/login'), HomeController.showOptions);
router.post('/removeGoal', ensureLoggedIn('/login'), HomeController.deleteGoal);
router.post('/', ensureLoggedIn('/login'), HomeController.change_week);
router.post('/add', ensureLoggedIn('/login'), HomeController.post_new_entry);
router.post('/plan', ensureLoggedIn('/login'), HomeController.create_new_plan);
router.post('/register', RegisterController.post_new_user);
router.post("/login", auth.authorize("/login"), LoginController.post_login);




router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

// router.use(function (err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send('There has been an error <a href=\"\"\>Back to home</a>');
// })


module.exports = router;
