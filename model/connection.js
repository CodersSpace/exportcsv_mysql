var mysql = require('mysql');

 const pool = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    port: "3306",
    database: "dhani"
  });

module.exports = pool;
