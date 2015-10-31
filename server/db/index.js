var mysql = require('promise-mysql');
// var mysql = require('mysql');
exports.

exports.dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'hr34',
  database: 'chat'
});

exports.dbConnection.connect();


var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'sauron',
    password: 'theonetruering',
    database: 'mordor'
}).then(function(conn){
    connection = conn;
});