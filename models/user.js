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

    init() {
        this.db.insert({
            user: 'JackPenman',
            password: '$2y$10$1pYMdma9l093RmU4FWoAzuogWybZdShpO7mIuo1BVzPIMZmy5lgd.'
        });
        return this;
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
            var entry = {
                user: username,
                password: hash,
            };
            console.log('user entry is: ', entry);

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