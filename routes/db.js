var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "mail.jaram.net",
    user: "join",
    password: "PBL-B6",
    database: "join"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('DB Connected!');
});

module.exports = conn;