var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var underscore = require('underscore');

var app = express();
var server = require('http').Server(app);

//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// CONNECT DB
// var conn = mysql.createConnection({
// 	host: "aa5psh6lopo2b9.c30xg8pih1rj.us-east-2.rds.amazonaws.com",
// 	user: "root",
// 	password: "root",
// 	database: "game_data"
// });
// conn.connect(function (err) {
// 	if (err) throw err;
// 	console.log('DB Connected!');
// });

// ROUTING
app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.get('/login', function (req, res) {
	res.render('login.ejs');
});

// RUN SERVER
server.listen(3000, function () {
	console.log(`Listening on ${server.address().port}`);
});