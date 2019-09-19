const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const json2csv = require('json2csv');
const fs = require('fs'); 

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/getData', function (req, res) {
    const url = 'mongodb://admin:detroit123@ds063946.mlab.com:63946/misale_dev';
    const migrateMongoDBTable = function(db, callback) {
        console.log("Reading database records");
        const collection = db.createCollection('orders', function(err, res) {
            if(err) console.log(err);
            // console.log('Collection Created...');
        });
        db.collection('orders').find({}).toArray(function(err, docs) {
            console.log('docs...', docs);
        //   console.log('Creating CSV...');
          
          const orderData = fs.readFileSync('csvjson.json');  
          const order = JSON.parse(orderData); 
        //   console.log('order: ', order);
          var json2csv = require('json2csv').Parser;
        //   const data = json2csv({ data: docs, fields: ['Region', 'Country', 'Item Type', 'Sales Channel', 'Order Priority', 'Order Date', 'Order ID', 'Ship Date', 'Units Sold', 'Unit Price', 'Unit Cost', 'Total Revenue', 'Total Cost', 'Total Profit'] });
          const fields = ['Region', 'Country', 'Item Type', 'Sales Channel', 'Order Priority', 'Order Date', 'Order ID', 'Ship Date', 'Units Sold', 'Unit Price', 'Unit Cost', 'Total Revenue', 'Total Cost', 'Total Profit'];
          const data = json2csv(docs, { fields });
          console.log('data: ', data);
        //   res.attachment('data.csv');
        fs.writeFileSync("./newFile.csv", csv);
          res.status(200).send(data);
          callback(docs);
        });
    };

    MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully to server");
      var dbo = db.db("mydb");
      migrateMongoDBTable(dbo, function() {
        db.close();
      });
    });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
// Connection URL
//var url = 'mongodb://localhost:27017/myproject';