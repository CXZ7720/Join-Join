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
            var sql = `SELECT dept, name, phone, charge, attendance FROM Staff_management;`;
            conn.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log("!!!");
                    console.log(err); //DB에러처리
                } else {
                    console.log(rows);
                    res.render('ad-staff', {
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

module.exports = router;