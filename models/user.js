const NeDB = require('nedb');

class User {

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
            username: 'Jim',
            password: 'Password123',
            diaryID: '1'
        });
        console.log('Jim inserted');
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

module.exports = User; 
