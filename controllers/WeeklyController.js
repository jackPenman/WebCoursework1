const weeklyPlanDAO = require('../models/WeeklyPlan');
const path = require('path');
const public = path.join(__dirname, '../views');
const dao = new weeklyPlanDAO("weeklyPlan.db");
// const UserDao = require('../models/user');
// const userdb = new UserDao("user.db");

exports.landing_page = function (req, res) {
    let user = req.user.user;
    res.render('homePage', {
        'startDate': 'Select a date to view weekly plan',
        'user': user,
        'goals': []
    });
}

exports.change_week = function (req, res) {
    let user = req.user.user;
    let chosenDate = getMonday(req.body.chosenDate);
    dao.getAllGoalsForUserAndWeek(user, chosenDate).then((json) => {
        res.render('homePage', {
            'startDate': "week start date : " + json.weekStartDate,
            'user': user,
            'goals': json.goals
        });
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('homePage', {
            'startDate': 'No weekly plan found for selected date',
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

exports.get_new_entry = function (req, res) {
    res.render('addActivity');
}

exports.post_new_entry = function (req, res) {
    console.log(getMonday(req.body.weekStartDate));
    dao.addEntry(req.body.title, req.body.description, req.body.startDate, req.body.endDate, req.user.user, getMonday(req.body.weekStartDate)).then((updatedRows) => {
        console.log("rows updated: " + updatedRows);
        res.redirect('/');
    }).catch((err) => {
        console.log('promise rejected', err);
        res.send("there is no weekly plan for this week yet <a href=\"\"\>Back </a>");

    })
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let monday = new Date(d.setDate(diff));
    let resultString = monday.getFullYear() + "-" + (monday.getMonth() + 1) + "-" + monday.getDate();
    return resultString;
}


exports.create_new_plan = function (req, res) {
    var weekstart = getMonday(req.body.weekStart);
    let goals = [
        {
            title: req.body.title1,
            startDate: req.body.startDate1,
            endDate: req.body.endDate1,
            description: req.body.description1,
            progressMade: 0
        },
        {
            title: req.body.title2,
            startDate: req.body.startDate2,
            endDate: req.body.endDate2,
            description: req.body.description2,
            progressMade: 0
        }, {
            title: req.body.title3,
            startDate: req.body.startDate3,
            endDate: req.body.endDate3,
            description: req.body.description3,
            progressMade: 0
        },
    ]
    dao.addNewPlan(weekstart, req.user.user, goals);
    res.redirect('/');
}
