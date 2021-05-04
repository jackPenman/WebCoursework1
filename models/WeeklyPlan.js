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

    addEntry(title, description, startDate, endDate, username, weekNumber) {
        var goal = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            progressMade: 0
        }
        console.log(goal);
        return new Promise((resolve, reject) => {
            this.db.insert({ planOwner: username, weekNumber: weekNumber }, { $push: { goals: goal } }, {}, function (err, updatedGoals) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(updatedGoals);
                }
            })
        })
    }

    addNewPlan(weekstartDate, userName, goals) {
        this.db.insert({
            planOwner: userName,
            startDate: weekstartDate,
            goals: goals
        })
    } s

    deleteEntry(title, week) {
        return new Promise((resolve, reject) => {
            this.db.remove({}, {}, {}, function (err, updatedGoals) {
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
