const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'views');
const router = require('./routes/activityTrackerRoutes.js');

var Datastore = require('nedb');
db = new Datastore();

const app = express();
app.use(express.static(public));

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})

app.use('/', router);



