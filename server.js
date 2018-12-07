var express = require('express');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
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
// var PORT = process.env.PORT;
var PORT = 3000;

//app setting
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(passport.initialize());
// app.use(passport.session());

//app scheduling
var rule = new schedule.RecurrenceRule();
rule.hour = 0;

var j = schedule.scheduleJob(rule, function () {
	console.log('The answer to life, the universe, and everything!');
});

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
app.use('/newmember', require('./routes/newmember'));
app.use('/reserve', require('./routes/reserve'));
app.use('/admin_reserv', require('./routes/admin_reserv'));
app.use('/admin_room', require('./routes/admin_room'));
app.use(['/admin', '/admin_staff'], require('./routes/admin_staff'));
app.use('/admin_custom', require('./routes/admin_custom'));

// RUN SERVER
server.listen(PORT, function () {
	console.log(`Listening on ${server.address().port}`);
});
