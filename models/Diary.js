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
            DiaryOwner: 'Jim',
            Activity: ['running', 'jogging']
        });
        console.log('Diary inserted');
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
