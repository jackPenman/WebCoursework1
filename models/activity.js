const NeDB = require('nedb');

class Activity {

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
            title: 'do a run',
            description: 'run 10k',
            dateCreated: '2021-03-01T18:25:43.511Z',
            goalDate: '2021-03-04T18:25:43.511Z',
            progress: '10.5'
        });
        console.log('run inserted');
        this.db.insert({
            title: 'cycle',
            description: 'clycle 10k',
            dateCreated: '2021-03-10T18:25:43.511Z',
            goalDate: '2021-03-11T18:25:43.511Z',
            progress: '55'
        });
        console.log('cycle inserted');
    }

    getAllEntries() {
        return new Promise((resolve, reject) => {

            this.db.find({}, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }


}

module.exports = Activity; 
