var router = require('express').Router();
var conn = require('./db');

router.get('/', function (req, res) {
    if (!req.session.username) {
        res.render('error', {
            username: "guest",
            title: 'Join & Join',
            message: "Permission denied"
        }); //로그인 안했을때
    } else { // Admin access
        if (req.session.username == 'admin') {
            var sql = `SELECT reserve_id, DATE_FORMAT(reserve_date, "%Y-%m-%d") as reserve_date, customer_id, DATE_FORMAT(check_in, "%Y-%m-%d") as check_in, DATE_FORMAT(check_out, "%Y-%m-%d") as check_out, room_number, how_many, food_count FROM Reservation ORDER BY reserve_id DESC LIMIT 1000`;
            conn.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log("!!!");
                    console.log(err); //DB에러처리
                } else {
                    console.log(rows);
                    res.render('ad-reserve', {
                        contents: rows
                    });
                }
            });
        } else {
            res.render('error', { //로그인 했을때
                username: req.session.username, //username을 같이 넘겨줌.
                title: 'Join & Join',
                message: "Permission denied"
            });
        }
    }
});

/*
conn.query(login_query, user, function (err, rows, fields) {
        if (err) {
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
    */

module.exports = router;