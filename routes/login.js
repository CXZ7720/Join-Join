var router = require('express').Router();
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

router.post('/', function (req, res) {
    console.log("!!");
    var username = req.body.username;
    var pwd = req.body.password;
    var user = new Object(); //user 객체 생성
    var login_query = `select count(*) as count, login_ID, password from Customer_info where login_ID="${username}" and password = "${pwd}";`;
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

});
router.get('/', function (req, res) {
    res.render('login');
});
module.exports = router;