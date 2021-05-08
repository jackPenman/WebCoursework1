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
            'startDate': 'No weekly plan found for selected date'
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
    dao.addEntry(req.body.title, req.body.description, req.body.startDate, req.body.endDate, req.body.targetReps, req.user.user, getMonday(req.body.weekStartDate)).then((updatedRows) => {
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
            targetReps: req.body.target1,
            completedReps: 0,
            isComplete: false
        },
        {
            title: req.body.title2,
            startDate: req.body.startDate2,
            endDate: req.body.endDate2,
            description: req.body.description2,
            targetReps: req.body.target2,
            completedReps: 0,
            isComplete: false
        }, {
            title: req.body.title3,
            startDate: req.body.startDate3,
            endDate: req.body.endDate3,
            description: req.body.description3,
            targetReps: req.body.target3,
            completedReps: 0,
            isComplete: false
        },
    ]
    dao.addNewPlan(weekstart, req.user.user, goals);
    res.redirect('/');
}

exports.showRemovePage = function (req, res) {
    res.render('deleteGoal');
}

exports.showUpdatePage = function (req, res) {
    res.render('updateGoal');
}

exports.showFilterPage = function (req, res) {
    res.render('filter');
}

exports.filterGoals = function (req, res) {
    let user = req.user.user;
    let chosenDate = getMonday(req.body.weekStartDate);
    dao.getAllGoalsForUserAndWeek(user, chosenDate).then((json) => {
        if (json === null) {
            res.render('filter', {
                'error': 'No weekly plan found for this date'
            });
        } else {
            var unfiltered = json.goals;
            var filtered = unfiltered.filter(function (goal) {
                return goal.isComplete === false;
            });
            console.log(filtered);
            res.render('homePage', {
                'startDate': "week start date : " + json.weekStartDate,
                'user': user,
                'goals': filtered
            });
        }
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('homePage', {
            'startDate': 'No weekly plan found for selected date'
        });
    })
}

exports.updateGoal = function (req, res) {
    if (req.body.weekStartDate === 'id="weekStartDate"') {
        res.redirect('/update');
    }
    else {
        console.log("update details");
        console.log(req.body);
        res.render('updateGoalDetails', {
            'startDate': req.body.weekStartDate,
            'goalTitle': req.body.updateTitle
        });
    }
}

exports.progressGoal = function (req, res) {
    if (req.body.weekStartDate === 'id="weekStartDate"') {
        res.redirect('/progress');
    }
    else {
        console.log("update details");
        console.log(req.body);
        res.render('progressDetails', {
            'startDate': req.body.weekStartDate,
            'goalTitle': req.body.updateTitle
        });
    }
}

exports.showProgressPage = function (req, res) {
    res.render('progress');
}

exports.updateGoalDetails = function (req, res) {
    console.log("updating goal details");
    dao.updateGoalDetails(req.body.title, req.body.description, req.body.startDate, req.body.endDate, req.body.targetReps, req.user.user, getMonday(req.body.weekStartDate), req.body.previous);
    res.redirect('/');
}
exports.deleteGoal = function (req, res) {
    console.log(req.body);
    dao.deleteEntry(getMonday(req.body.weekStartDate), req.user.user, req.body.removeTitle);
    res.redirect('/');
}

exports.showOptionsForUpdate = function (req, res) {
    let user = req.user.user;
    let chosenDate = getMonday(req.body.weekStartDate);
    dao.getAllGoalsForUserAndWeek(user, chosenDate).then((json) => {
        if (json.goals === null) {
            res.render('updateGoal', {
                'error': 'No weekly plan found for selected date'
            });
        }
        res.render('progress', {
            'goals': json.goals,
            'startDate': chosenDate
        });
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('updateGoal', {
            'error': 'No weekly plan found for selected date'
        });
    })
}



exports.progressGoalWithReps = function (req, res) {
    dao.addProgress(getMonday(req.body.weekStartDate), req.user.user, req.body.goalTitle, req.body.completedReps);
    res.redirect('/');
}
exports.showOptionsForProgress = function (req, res) {
    let user = req.user.user;
    let chosenDate = getMonday(req.body.weekStartDate);
    dao.getAllGoalsForUserAndWeek(user, chosenDate).then((json) => {
        if (json.goals === null) {
            res.render('progress', {
                'error': 'No weekly plan found for selected date'
            });
        }
        res.render('progress', {
            'goals': json.goals,
            'startDate': chosenDate
        });
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('progress', {
            'error': 'No weekly plan found for selected date'
        });
    })
}


exports.showOptions = function (req, res) {
    let user = req.user.user;
    let chosenDate = getMonday(req.body.weekStartDate);
    dao.getAllGoalsForUserAndWeek(user, chosenDate).then((json) => {
        if (json.goals === null) {
            res.render('deleteGoal', {
                'error': 'No weekly plan found for selected date'
            });
        }
        res.render('deleteGoal', {
            'goals': json.goals,
            'startDate': chosenDate
        });
    }).catch((err) => {
        console.log('promise rejected', err);
        res.render('deleteGoal', {
            'error': 'No weekly plan found for selected date'
        });
    })
}
