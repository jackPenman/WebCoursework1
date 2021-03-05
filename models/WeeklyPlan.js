const NeDB = require('nedb');

class WeeklyPlan {


    // this.db.insert({
    //     title: 'do a run',
    //     description: 'run 10k',
    //     dateCreated: '2021-03-01T18:25:43.511Z',
    //     goalDate: '2021-03-04T18:25:43.511Z',
    //     progress: '10.5'
    // });
    // console.log('run inserted');

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new NeDB({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new NeDB();
        }
    }

    init() {
        this.db.insert({
            planOwner: 'Jim',
            weekNumber: '1',
            goals: [{
                title: 'running',
                createdOn: 'Monday',
                finishBy: 'Wednesday',
                description: 'run 10 km',
                progressMade: '45.5'
            },
            {
                title: 'Push ups',
                createdOn: 'Wednesday',
                finishBy: 'Friday',
                description: 'Do 40000 push ups',
                progressMade: '10'
            }
            ]
        });
        console.log('Jims weekly plan inserted');
        this.db.insert({
            planOwner: 'Karen',
            weekNumber: '1',
            goals: [{
                title: 'jog',
                createdOn: 'Monday',
                finishBy: 'Tuesday',
                description: 'jog a little',
                progressMade: '45.5'
            },
            {
                title: 'Push ups',
                createdOn: 'Wednesday',
                finishBy: 'Friday',
                description: 'Do 40000 push ups',
                progressMade: '10'
            }
            ]
        });
    }

    getAllGoalsForUserAndWeek(username, week) {
        return new Promise((resolve, reject) => {

            this.db.find({ planOwner: username, weekNumber: week }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    console.log("look", entries)
                    resolve(entries[0]);
                }
            })
        })
    }


}

module.exports = WeeklyPlan; 
