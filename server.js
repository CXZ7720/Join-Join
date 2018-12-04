var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var underscore = require('underscore');
// var passport = require('passport');
var session = require('express-session');
// var LocalStrategy = require('passport-local').Strategy;

var app = express();
var server = require('http').Server(app);

app.use(session({
	key: 'sid',
	secret: 'join',
	resave: false,
	saveUninitialized: true
}));

//Setting up port for Heroku Deploy
var PORT = process.env.PORT;
// var PORT = 3000;

//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(passport.initialize());
// app.use(passport.session());

// -hus-cdbr-iron-east-01.cleardb.net -ubf543e9cd3c6f8 -p
// CONNECT DB
// connect HEROKU DB
// var conn = mysql.createConnection({
// 	host: "us-cdbr-iron-east-01.cleardb.net",
// 	user: "bf543e9cd3c6f8",
// 	password: "0dabca01",
// 	database: "heroku_d9e757d3af4c794"
// });
var conn = mysql.createConnection({
	host: "mail.jaram.net",
	user: "join",
	password: "PBL-B6",
	database: "join"
});

// server.js 에서는 DB 접근하는 부분이 없기 떄문에 임시로 주석처리.
// 추후에 전역으로 사용하는 방법을 찾아야함.
// conn.connect(function (err) {
// 	if (err) throw err;
// 	console.log('DB Connected!');
// });

// ROUTING	
app.get('/', function (req, res) {
	// res.redirect('/');
	if (req.session.username == 'admin') {
		res.redirect('/admin');
	} else {
		res.redirect('/index');
		console.log(req.session);
	}
});


app.use('/index', require('./routes/index')); //여러개의 라우팅을 한번에 : 배열에 담아서 선언.
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/reserve', require('./routes/reserve'));
app.use('/admin_reserv', require('./routes/admin_reserv'));
app.use('/admin_room', require('./routes/admin_room'));
app.use(['/admin','/admin_staff'], require('./routes/admin_staff')); 

// RUN SERVER
server.listen(PORT, function () {
	console.log(`Listening on ${server.address().port}`);
});
