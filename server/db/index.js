var mysql = require('promise-mysql');
// var mysql = require('mysql');


// var db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', 
//   password: 'hr34',
//   database: 'chat'
// });

// db.connect();

var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hr34',
    database: 'chat'
}).then(function(conn) {
  module.exports.db = conn;
});