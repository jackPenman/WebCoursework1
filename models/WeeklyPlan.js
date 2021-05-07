const NeDB = require('nedb');

class WeeklyPlan {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new NeDB({ filename: dbFilePath, autoload: true });
        } else {
            this.db = new NeDB();
        }
    }

    init() {
        this.db.insert({
            planOwner: 'Peter',
            weekStartDate: '2021-03-15',
            goals: [{
                title: 'running',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'run 10 km',
                progressMade: '45.5'
            },
            {
                title: 'Push ups',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'Do 40000 push ups',
                progressMade: '10'
            },
            {
                title: 'Dancing',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'Dance for fun',
                progressMade: '100'
            }
            ]
        });
        this.db.insert({
            planOwner: 'Ann',
            weekStartDate: '2021-06-22',
            goals: [{
                title: 'running',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'run 10 km',
                progressMade: '45.5'
            },
            {
                title: 'Push ups',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'Do 40000 push ups',
                progressMade: '10'
            },
            {
                title: 'Dancing',
                startDate: '2021-03-15',
                endDate: '2021-03-19',
                description: 'Dance for fun',
                progressMade: '100'
            }
            ]
        });
    }



    getAllGoalsForUserAndWeek(username, weekStartDate) {
        console.log("week start date " + weekStartDate);
        return new Promise((resolve, reject) => {
            this.db.findOne({ planOwner: username, weekStartDate: weekStartDate }, function (err, entry) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entry);
                }
            })
        })
    }


    addNewPlan(weekstartDate, userName, goals) {
        this.db.insert({
            planOwner: userName,
            weekStartDate: weekstartDate,
            goals: goals
        })
    }

    deleteEntry(week, user, titleToRemove) {
        this.getAllGoalsForUserAndWeek(user, week).then((json) => {
            var goalsToChange = json.goals;
            let updated = goalsToChange.filter(function (goal) {
                return goal.title !== titleToRemove;
            });
            console.log(updated);
            new Promise((resolve, reject) => {
                this.db.update({ planOwner: user, weekStartDate: week }, { $set: { goals: updated } }, {}, function (err, updatedGoals) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(updatedGoals);
                    }
                })
            }).then((updatedRows) => {
                console.log("Goal removed from " + updatedRows + " rows");
            }).catch((err) => {
                console.log('promise rejected', err);
            })
        }).catch((err) => {
            console.log(err);
        });

    }

    addProgress(week, user, titleToRemove) {
        this.getAllGoalsForUserAndWeek(user, week).then((json) => {
            var goalsToChange = json.goals;
            let updated = goalsToChange.filter(function (goal) {
                return goal.title !== titleToRemove;
            });
            console.log(updated);
            new Promise((resolve, reject) => {
                this.db.update({ planOwner: user, weekStartDate: week }, { $set: { goals: updated } }, {}, function (err, updatedGoals) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(updatedGoals);
                    }
                })
            }).then((updatedRows) => {
                console.log("Goal removed from " + updatedRows + " rows");
            }).catch((err) => {
                console.log('promise rejected', err);
            })
        }).catch((err) => {
            console.log(err);
        });

    }



    addEntry(title, description, startDate, endDate, targetReps, username, weekStart) {
        console.log(weekStart);
        var goal = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            targetReps: targetReps,
            isComplete: false
        }
        return new Promise((resolve, reject) => {
            this.db.update({ planOwner: username, weekStartDate: weekStart }, { $push: { goals: goal } }, {}, function (err, updatedGoals) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(updatedGoals);
                }
            })
        })
    }

}



module.exports = WeeklyPlan; 
