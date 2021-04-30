const bcrypt = require('bcrypt');
const NeDB = require('nedb');
const saltRounds = 10;
class User {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new NeDB({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new NeDB();
        }
    }
    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            user: 'Peter',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C',
            diaryID: '1'

        });
        //console.log('user record inserted in init');

        this.db.insert({
            user: 'Ann',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S',
            diaryID: '2'

        });
        //console.log('user record inserted in init');
        return this;
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
            var entry = {
                user: username,
                password: hash,
            };
            //console.log('user entry is: ', entry);

            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }
    lookup(user, cb) {
        this.db.find({ 'user': user }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}

module.exports = User;