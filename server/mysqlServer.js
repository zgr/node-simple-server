var mysql = require('mysql');
console.log(mysql)
var connection = mysql.createConnection({
  host     : '47.106.187.58',
  user     : 'root',
  password : 'root',
  database : 'test'
});
connection.connect();
 
connection.query('SELECT * from websites', function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].url);
});