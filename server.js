
const express = require('express');
const app = express();
const path = require('path');
const json2csv = require('json2csv');
const fs = require('fs'); 
const bodyParser = require('body-parser');

const controll_server = require('./controller/product');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/', function(req, res) {
    res.send('Get Data');
});

app.get('/getCSV', controll_server.getData);
app.post('/getCSV', controll_server.getData);