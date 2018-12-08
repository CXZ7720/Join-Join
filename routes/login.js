var router = require('express').Router();
var conn = require('./db');

router.post('/', function (req, res) {
    console.log("!!");
    var username = req.body.username;
    var pwd = req.body.password;
    var user = new Object(); //user 객체 생성
    var login_query = `select count(*) as count, login_ID, customer_id from Customer_info where login_ID="${username}" and password = "${pwd}";`;
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
                user.customer_id = rows[0]['customer_id'];
                console.log(user);
                req.session.username = user.username;
                req.session.customer_id = user.customer_id;
                res.redirect('/');
            }
        }
    });

});
router.get('/', function (req, res) {
    if (!req.session.username) {
        res.render('login', {
            username: "guest",
            title: 'Join & Join'
        }); //로그인 안했을때
    } else {
        res.render('login', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            customer_id: req.session.customer_id,
            title: 'Join & Join'
        });
    }
});
module.exports = router;