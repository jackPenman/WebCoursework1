const weeklyPlanDAO = require('../models/WeeklyPlan');
const path = require('path');
const public = path.join(__dirname, '../views');
const dao = new weeklyPlanDAO("database.db");
const UserDao = require('../models/user');
// const userdb = new UserDao("database.db");

exports.landing_page = function (req, res) {
    let user = req.user.user;
    console.log(user);
    dao.getAllGoalsForUserAndWeek(user, '1').then((json) => {
        res.render('homePage', {
            'weekNumber': 'Week 1',
            'user': user,
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

exports.addPlan = function (req, res) {
    res.render('addPlan');
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

exports.create_new_plan = function (req, res) {
    dao.addEntry(req.body.userName, req.body.weekNumber, rq.body.goals).then((updatedRows) => {
        console.log("rows updated: " + updatedRows);
        res.redirect('/');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
} 
