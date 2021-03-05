const WeeklyPlanDAO = require('../models/WeeklyPlan');
const path = require('path');
const public = path.join(__dirname, '../views');
const db = new WeeklyPlanDAO();

exports.landing_page = function (req, res) {
    db.init();
    db.getAllGoalsForUserAndWeek('Jim', '1').then((json) => {
        res.render('homePage', {
            'weekNumber': 'Week 1',
            'goals': json.goals
        });
        console.log(json);
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}
