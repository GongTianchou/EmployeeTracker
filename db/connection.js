const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Tc31415926.',
  multipleStatements: true
});

module.exports = db;