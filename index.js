
// var mysql = require('mysql');
const db = require('./model/connection');
var json2csv = require('json2csv').parse;
var fs =require('fs');

// var con = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "1234",
//     port: "3306",
//     database: "product"
//   };
  
// con.connect(function(err) {
    // var pool = mysql.createConnection(con);
    // if (err) throw err;
    // console.log("Connected!");
    //    var sql = "CREATE TABLE orders (Region VARCHAR(255), Country VARCHAR(255), Item_Type VARCHAR(255), Sales_Channel VARCHAR(255), Order_Priority VARCHAR(255) Order_Date DATE, Order_ID VARCHAR(255), Ship_Date Date, Units_Sold INT(16), Unit_Price INT(16), Unit_cost INT(16), Total_Revenue INT(255), Total_Cost INT(255), Total_Profit INT(255))";
    //  var sql = "CREATE TABLE customer1 (name VARCHAR(255), country VARCHAR(255), dob DATE)";
    // var sql = "INSERT INTO orders(Region,Country,Item_Type,Sales_Channel,Order_Priority,Order_Date,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) VALUES ?";
    const get_region = "SELECT * FROM orders WHERE Region=?";
    const values = [
    ['Middle East and North Africa','Libya','Cosmetics','Offline','M','2014-10-18','2014-10-31',8446,437.20,263.33,3692591.20,2224085.18,1468506.02],
    ['North America','Canada','Vegetables','Online','M','2011-07-11','2011-08-12',3018,154.06,90.93,464953.08,274426.74,190526.34],
    ['Middle East and North Africa','Libya','Baby Food','Offline','C','2016-10-31','2016-09-12',1517,255.28,159.42,387259.76,241840.14,145419.62],
    ['Asia','Japan','Cereal','Offline','C','2010-04-10','2010-05-12',3322,205.70,117.11,683335.40,389039.42,294295.98],
    ['Sub-Saharan Africa','Chad','Fruits','Offline','H','2011-08-16','2011-08-31',9845,9.33,6.92,91853.85,68127.40,23726.45],
    ['Europe','Armenia','Cereal','Online','H','2014-11-24','2014-12-28',9528,205.70,117.11,1959909.60,1115824.08,844085.52],
    ['Sub-Saharan Africa','Eritrea','Cereal','Online','H','2015-04-03','2015-04-17',2844,205.70,117.11,585010.80,333060.84,251949.96],
    ['Europe','Montenegro','Clothes','Offline','M','2012-05-17','2012-06-28',7299,109.28,35.84,797634.72,261596.16,536038.56],
    ['Central America and the Caribbean','Jamaica','Vegetables','Online','H','2015-01-25','2015-03-07',2428,154.06,90.93,374057.68,220778.04,153279.64]
    // ['Australia and Oceania','Fiji','Vegetables','Offline','H','12-24-2013',118598544,'1-19-2014',4800,154.06,90.93,739488.00,436464.00,303024.00],
    // ['Sub-Saharan Africa','Togo','Clothes','Online','M','12-29-2015',451010930,'1-19-2016',3012,109.28,35.84,329151.36,107950.08,221201.28],
    // ['Europe','Montenegro','Snacks','Offline','M','2-27-2010',220003211,'3-18-2010',2694,152.58,97.44,411050.52,262503.36,148547.16],
    // ['Europe','Greece','Household','Online','C','11-17-2016',702186715,'12-22-2016',1508,668.27,502.54,1007751.16,757830.32,249920.84],
    // ['Sub-Saharan Africa','Sudan','Cosmetics','Online','C','12-20-2015',544485270,'1-5-2016',4146,437.20,263.33,1812631.20,1091766.18,720865.02],
    // ['Asia','Maldives','Fruits','Offline','L','1-8-2011',714135205,'2-6-2011',7332,9.33,6.92,68407.56,50737.44,17670.12],
    // ['Europe','Montenegro','Clothes','Offline','H','6-28-2010',448685348,'7-22-2010',4820,109.28,35.84,526729.60,172748.80,353980.80],
    // ['Europe','Estonia','Office Supplies','Online','H','4-25-2016',405997025,'5-12-2016',2397,651.21,524.96,1560950.37,1258329.12,302621.25],
    // ['North America','Greenland','Beverages','Online','M','7-27-2012',414244067,'8-7-2012',2880,47.45,31.79,136656.00,91555.20,45100.80],
    // ['Sub-Saharan Africa','Cape Verde','Clothes','Online','C','9-8-2014',821912801,'10-3-2014',1117,109.28,35.84,122065.76,40033.28,82032.48],
    // ['Sub-Saharan Africa','Senegal','Household','Offline','L','8-27-2012',247802054,'9-8-2012',8989,668.27,502.54,6007079.03,4517332.06,1489746.97],
    // ['Australia and Oceania','Federated States of Micronesia','Snacks','Online','C','9-3-2012',531023156,'10-15-2012',407,152.58,97.44,62100.06,39658.08,22441.98],
    // ['Europe','Bulgaria','Clothes','Online','L','8-27-2010',880999934,'9-16-2010',6313,109.28,35.84,689884.64,226257.92,463626.72],
    // ['Middle East and North Africa','Algeria','Personal Care','Online','H','2-20-2011',127468717,'3-9-2011',9681,81.73,56.67,791228.13,548622.27,242605.86],
    // ['Asia','Mongolia','Clothes','Online','L','12-12-2015',770478332,'1-24-2016',515,109.28,35.84,56279.20,18457.60,37821.60],
    // ['Central America and the Caribbean','Grenada','Cereal','Online','H','10-28-2012',430390107,'11-13-2012',852,205.70,117.11,175256.40,99777.72,75478.68],
    // ['Central America and the Caribbean','Grenada','Beverages','Online','M','1-30-2017',397877871,'3-20-2017',9759,47.45,31.79,463064.55,310238.61,152825.94],
    // ['Sub-Saharan Africa','Senegal','Beverages','Offline','M','10-22-2014',683927953,'11-4-2014',8334,47.45,31.79,395448.30,264937.86,130510.44],
    // ['North America','Greenland','Fruits','Offline','M','1-31-2012',469839179,'2-22-2012',4709,9.33,6.92,43934.97,32586.28,11348.69],
    // ['Sub-Saharan Africa','Chad','Meat','Offline','H','1-20-2016',357222878,'3-9-2016',9043,421.89,364.69,3815151.27,3297891.67,517259.60],
    // ['Sub-Saharan Africa','Mauritius','Personal Care','Online','C','1-1-2016',118002879,'1-7-2016',8529,81.73,56.67,697075.17,483338.43,213736.74],
    // ['Middle East and North Africa','Morocco','Beverages','Offline','C','6-1-2017',944415509,'6-23-2017',2391,47.45,31.79,113452.95,76009.89,37443.06],
    // ['Central America and the Caribbean','Honduras','Office Supplies','Online','H','6-30-2015',499009597,'7-9-2015',6884,651.21,524.96,4482929.64,3613824.64,869105.00],
    // ['Sub-Saharan Africa','Benin','Fruits','Online','L','1-28-2014',564646470,'3-16-2014',293,9.33,6.92,2733.69,2027.56,706.13],
    // ['Europe','Greece','Baby Food','Offline','M','4-8-2014',294499957,'4-8-2014',7937,255.28,159.42,2026157.36,1265316.54,760840.82],
    // ['Central America and the Caribbean','Jamaica','Beverages','Offline','L','9-4-2010',262056386,'10-24-2010',7163,47.45,31.79,339884.35,227711.77,112172.58],
    // ['Sub-Saharan Africa','Equatorial Guinea','Office Supplies','Online','M','5-2-2010',211114585,'5-14-2010',2352,651.21,524.96,1531645.92,1234705.92,296940.00],
    // ['Sub-Saharan Africa','Swaziland','Office Supplies','Offline','H','10-3-2013',405785882,'10-22-2013',9915,651.21,524.96,6456747.15,5204978.40,1251768.75],
    // ['Central America and the Caribbean','Trinidad and Tobago','Vegetables','Offline','M','3-6-2011',280494105,'4-14-2011',3294,154.06,90.93,507473.64,299523.42,207950.22],
    // ['Europe','Sweden','Baby Food','Online','L','8-7-2016',689975583,'8-12-2016',7963,255.28,159.42,2032794.64,1269461.46,763333.18],
    // ['Europe','Belarus','Office Supplies','Online','L','1-11-2011',759279143,'2-18-2011',6426,651.21,524.96,4184675.46,3373392.96,811282.50],
    // ['Sub-Saharan Africa','Guinea-Bissau','Office Supplies','Offline','C','5-21-2014',133766114,'6-12-2014',3221,651.21,524.96,2097547.41,1690896.16,406651.25],
    // ['Asia','Mongolia','Beverages','Online','M','8-3-2013',329110324,'9-2-2013',9913,47.45,31.79,470371.85,315134.27,155237.58],
    // ['Middle East and North Africa','Turkey','Meat','Online','L','10-5-2011',681298100,'11-20-2011',103,421.89,364.69,43454.67,37563.07,5891.60],
    // ['Sub-Saharan Africa','Central African Republic','Snacks','Offline','L','11-15-2016',596628272,'12-30-2016',4419,152.58,97.44,674251.02,430587.36,243663.66],
    // ['Sub-Saharan Africa','Equatorial Guinea','Office Supplies','Offline','L','4-3-2015',901712167,'4-17-2015',5523,651.21,524.96,3596632.83,2899354.08,697278.75],
    // ['Asia','Laos','Beverages','Online','M','3-22-2013',693473613,'4-21-2013',3107,47.45,31.79,147427.15,98771.53,48655.62],
    // ['Europe','Armenia','Meat','Online','C','8-2-2010',489148938,'9-1-2010',8896,421.89,364.69,3753133.44,3244282.24,508851.20],
    // ['Europe','Greece','Household','Online','L','1-5-2012',876286971,'2012-02-15',1643,668.27,502.54,1097967.61,825673.22,272294.39],
    // ['Middle East and North Africa','Israel','Personal Care','Offline','H','2015-08-26',262749040,'2015-08-30',2135,81.73,56.67,174493.55,120990.45,53503.10]
    ];
    exports.getData = function(req, res) {
        db.query(get_region, req.params.region, function(err, result) {
            if(err) throw err;
            var fields = ['Region','Country','Item_Type','Sales_Channel','Order_Priority','Order_Date','Ship_Date','Units_Sold','Unit_Price','Unit_Cost','Total_Revenue','Total_Cost','Total_Profit'];
            var data = json2csv(result, {fields});
            res.attachment('yourfilenamehere.csv');
            fs.writeFile('data.csv', data, function(err) {
            if (err) {
               return console.error(err);
            }
            
            res.status(200).send("Data written successfully!");
        });
        })
    }
//   });