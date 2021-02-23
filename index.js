const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'public');

var Datastore = require('nedb');
db = new Datastore();

const app = express();
app.use(express.static(public));

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})

app.get('/', function (req, res) {
    res.sendFile(path.join(public, 'index.html'));
})
