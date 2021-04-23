const weeklyPlanDAO = require('../models/WeeklyPlan');
const path = require('path');
const public = path.join(__dirname, '../views');
const dao = new weeklyPlanDAO("database.db");
const UserDao = require('../models/user');
const userdb = new UserDao("database.db");



exports.landing_page = function (req, res) {
    let user = req.params.author;
    dao.getAllGoalsForUserAndWeek(user, '1').then((json) => {
        res.render('homePage', {
            'weekNumber': 'Week 1',
            'user': req.user,
            'goals': json.goals
        });
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('homePage', {
            'weekNumber': 'Error has occured',
            'goals': []
        });
    })
}

exports.addActivity = function (req, res) {
    res.render('addActivity');
}

exports.post_new_entry = function (req, res) {
    dao.addEntry(req.body.title, req.body.description, req.body.startDate, req.body.endDate, 'Jim', req.body.weekNumber).then((updatedRows) => {
        console.log("rows updated: " + updatedRows);
        res.redirect('/');
    }).catch((err) => {
        console.log('promise rejected', err);
        res.send("there is no weekly plan for this week yet <a href=\"\"\>Back </a>");

    })
} 
