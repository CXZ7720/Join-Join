var express = require('express');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var underscore = require('underscore');
var async = require("async");
var conn = require('./routes/db');
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

const queryPromise = (query) => {
	return new Promise((resolve, reject) => {
		conn.query(query, (err, res) => {
			if (err) reject(err)
			else resolve(res)
		})
	})
}

var update = function () {
	var updateNewReserve = `UPDATE Room_management as m SET reserve_id = (SELECT reserve_id FROM Reservation as r WHERE check_in <= NOW() AND check_out >= NOW() and r.room_number = m.room_number);`;
	var updateEmptyRoom = `UPDATE Room_management as r1 SET r1.staff_id = NULL, r1.reserve_id = NULL WHERE NOW() > (SELECT check_out FROM Reservation as r2 WHERE r1.reserve_id = r2.reserve_id);`;
	var updateReadyStaff = `UPDATE Staff_management SET charge = "대기" WHERE dept = "객실" AND staff_id NOT IN (SELECT staff_id FROM Room_management WHERE reserve_id IS NOT NULL);`;
	var findNewStaff = `SELECT room_number FROM Room_management WHERE reserve_id IN (SELECT reserve_id FROM Reservation WHERE (check_in <= now() and check_out >= now()) AND staff_id IS NULL);`;
	queryPromise(updateNewReserve)
		.then((queryResult) => {
			return queryPromise(updateEmptyRoom)
		})
		.then((queryResult) => {
			return queryPromise(updateReadyStaff)
		})
		.then((queryResult) => {
			return queryPromise(findNewStaff);
		}).then((queryResult) => {
			var data = queryResult;
			console.log(data);
			if (data.length != 0) {
				var sql = `UPDATE Staff_management SET charge = \"?\" WHERE charge = "대기" and dept = "객실" and staff_id ORDER BY RAND() LIMIT 1;`
				var ssql = `UPDATE Room_management as r SET staff_id = (SELECT staff_id FROM Staff_management as s WHERE s.charge = \"?\") WHERE r.room_number = ?;`
				async.forEachOf(data, function (dataElement, i, inner_callback) {
					sql = "UPDATE Staff_management SET charge = " + [data[i].room_number] + " WHERE charge = \"대기\" and dept = \"객실\" and staff_id ORDER BY RAND() LIMIT 1;"
					queryPromise(sql)
						.then((queryResult) => {
							ssql = "UPDATE Room_management as r SET staff_id = (SELECT staff_id FROM Staff_management as s WHERE s.charge = \"" + [data[i].room_number] + "\") WHERE r.room_number = " + [data[i].room_number] + ";";
							return queryPromise(ssql);
						}).
						catch((err) => {
							console.error(err)
						});
				}, function (err) {
					if (err) {
						//handle the error if the query throws an error
					} else {
						//whatever you wanna do after all the iterations are done
					}
				});
				console.log("here");
			}
		})
		.catch((err) => {
			console.error(err)
		});
};

update();

var j = schedule.scheduleJob(rule, function () {
	update();
	console.log('Room management UPDATED!');
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
app.get('/update', function (req, res) {
	// res.redirect('/');
	update();
	res.redirect('/admin_room');
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
