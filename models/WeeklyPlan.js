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
            planOwner: "Ann",
            weekStartDate: "2021-5-3",
            goals: [
                {
                    title: "Goal2",
                    startDate: "2021-05-13",
                    endDate: "2021-05-27",
                    description: "Goal2",
                    targetReps: "383477474",
                    completedReps: 0,
                    isComplete: false
                },
                {
                    title: "goal3",
                    startDate: "2021-05-08",
                    endDate: "2021-05-08",
                    description: "goal3 ",
                    targetReps: "10",
                    completedReps: 0,
                    isComplete: false
                },
                {
                    title: "goal1",
                    startDate: "2021-05-08",
                    endDate: "2021-05-27",
                    description: "goal1",
                    targetReps: "5",
                    completedReps: 0,
                    isComplete: false
                }
            ]
        });

    }



    getAllGoalsForUserAndWeek(username, weekStartDate) {
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

    getAllPlansForUser(username) {
        return new Promise((resolve, reject) => {
            this.db.find({ planOwner: username }, function (err, entry) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entry);
                }
            })
        })
    }


    addNewPlan(weekstartDate, userName, goals) {

        this.getAllPlansForUser(userName).then((json) => {
            var existingPlans = json;
        })
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


    addProgress(weekStart, username, goalTitle, completedReps) {

        this.getAllGoalsForUserAndWeek(username, weekStart).then((json) => {
            var savedGoals = json.goals;
            let goalToProgress = savedGoals.filter(function (goal) {
                return goal.title === goalTitle;
            });
            savedGoals = savedGoals.filter(function (goal) {
                return goal.title !== goalTitle;
            });
            goalToProgress[0].completedReps = (parseInt(goalToProgress[0].completedReps) + parseInt(completedReps));
            if (parseInt(goalToProgress[0].targetReps) <= parseInt(completedReps)) {
                goalToProgress[0].isComplete = true;
            }
            savedGoals.push(goalToProgress[0]);
            new Promise((resolve, reject) => {
                this.db.update({ planOwner: username, weekStartDate: weekStart }, { $set: { goals: savedGoals } }, {}, function (err, updatedGoals) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(updatedGoals);
                    }
                })
            }).then((updatedRows) => {
                console.log("Goal updated, " + updatedRows + " rows altered");
            }).catch((err) => {
                console.log('promise rejected', err);
            })
        }).catch((err) => {
            console.log(err);
        });


    }


    addEntry(title, description, startDate, endDate, targetReps, username, weekStart) {
        var goal = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            targetReps: targetReps,
            completedReps: 0,
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


    updateGoalDetails(title, description, startDate, endDate, targetReps, username, weekStart, previousTitle) {
        this.getAllGoalsForUserAndWeek(username, weekStart).then((json) => {
            var goal = {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                targetReps: targetReps,
                completedReps: 0,
                isComplete: false
            }
            var goalsUpdate = json.goals;
            goalsUpdate = goalsUpdate.filter(function (goal) {
                return goal.title !== previousTitle;
            });
            goalsUpdate.push(goal);
            console.log(goalsUpdate);
            new Promise((resolve, reject) => {
                this.db.update({ planOwner: username, weekStartDate: weekStart }, { $set: { goals: goalsUpdate } }, {}, function (err, updatedGoals) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(updatedGoals);
                    }
                })
            }).then((updatedRows) => {
                console.log("Goal updated, " + updatedRows + " rows altered");
            }).catch((err) => {
                console.log('promise rejected', err);
            })
        }).catch((err) => {
            console.log(err);
        });


    }
}



module.exports = WeeklyPlan; 
