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

conn.connect(function (err) {
	if (err) throw err;
	console.log('DB Connected!');
});


// ROUTING
//라우팅 분리
var indexRouter = require('./routes/index.js');
var loginxRouter = require('./routes/login.js');
app.use(['/','/index'], indexRouter); //여러개의 라우팅을 한번에 : 배열에 담아서 선언.
app.use('/login', loginxRouter);


app.post('/login', function (req, res) {	
	var username = req.body.username;
	var pwd = req.body.password;
	var user = new Object(); //user 객체 생성
	var login_query = `select count(*) as count, login_ID, password from Customer_info where login_ID="${username}" and password = "${pwd}";`;
	conn.query(login_query, user, function (err, rows, fields) {
		if(err){
			console.log("!!!")
			console.log(err); //DB에러처리
		} else {
			console.log(rows[0]);
			if (rows[0]['count'] == 0) {
				res.redirect('/login'); //로그인실패
			} else {
				console.log("login success!");
				user.username = rows[0]['login_ID'];
				user.password = rows[0]['password'];
				console.log(user);

				req.session.username = user.username;
				res.redirect('/');
			}
		}
	});	

});

// RUN SERVER
server.listen(PORT, function () {
	console.log(`Listening on ${server.address().port}`);
});