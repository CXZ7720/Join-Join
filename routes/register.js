var router = require('express').Router();

router.get('/', function (req, res) {
    if (!req.session.username) {
        res.render('register', {
            username: "guest",
            title: 'Join & Join'
        }); //로그인 안했을때
    } else {
        res.render('register', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            title: 'Join & Join'
        });
    }
});

module.exports = router;
