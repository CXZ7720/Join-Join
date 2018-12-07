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
            var sql = `SELECT login_ID as ID, FR_FirstName as FN, FR_LastName as LN, DATE_FORMAT(birthday, "%Y-%m-%d") as birthday, gender, email, phone FROM Customer_info natural join Customer_name WHERE login_ID != "admin" ORDER BY customer_id DESC LIMIT 500`;
            conn.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log("!!!");
                    console.log(err); //DB에러처리
                } else {
                    console.log(rows);
                    res.render('ad-custom', {
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