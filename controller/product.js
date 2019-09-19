
const db = require('../model/connection');
var json2csv = require('json2csv').parse;
var fs = require('fs');

    
    exports.getData = function(req, res) {
        const get_region = "SELECT * FROM product.orders WHERE Region=?";
        db.connect(function(err) {
            if (err) throw err;
            console.log(req.body.region);
            db.query(get_region, req.body.region, function(err, result) {
                if(err) throw err;
                var fields = ['Region','Country','Item_Type','Sales_Channel','Order_Priority','Order_Date','Ship_Date','Units_Sold','Unit_Price','Unit_Cost','Total_Revenue','Total_Cost','Total_Profit'];
                var data = json2csv(result, {fields});
                res.attachment('data.csv');
                fs.writeFile('data.csv', data, function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log(data);
            
                res.status(200).send("Data written successfully!");
            });
        });
    });
    };