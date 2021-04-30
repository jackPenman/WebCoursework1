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
            weekNumber: '1',
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
            weekNumber: '1',
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

    getAllGoalsForUserAndWeek(username, week) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ planOwner: username, weekNumber: week }, function (err, entry) {
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
            this.db.update({ planOwner: username, weekNumber: weekNumber }, { $push: { goals: goal } }, {}, function (err, updatedGoals) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(updatedGoals);
                }
            })
        })
    }

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
