const weeklyPlanDAO = require('../models/WeeklyPlan');
const path = require('path');
const public = path.join(__dirname, '../views');
const dao = new weeklyPlanDAO("weeklyPlan.db");
const UserDao = require('../models/user');
const userdb = new UserDao("user.db");

exports.landing_page = function (req, res) {
    let user = req.user.user;
    console.log(user);
    dao.getAllGoalsForUserAndWeek(user, '2021-03-15').then((json) => {
        res.render('homePage', {
            'weekNumber': json.weekStartDate,
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
    dao.addEntry(req.body.title, req.body.description, req.body.startDate, req.body.endDate, 'Jim', getMonday(req.body.weekStartDate)).then((updatedRows) => {
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
    let resultString = monday.getFullYear() + "-" + monday.getMonth() + "-" + monday.getDate();
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
    console.log(goals);
    console.log("username for this: " + req.user.user);
    dao.addNewPlan(weekstart, req.user.user, goals);
    res.redirect('/');
}

function isDateInThisWeek(weekBeginning, date) {
    const todayDate = weekBeginning.getDate();
    const todayDay = weekBeginning.getDay();

    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}
