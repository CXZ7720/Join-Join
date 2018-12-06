var router = require('express').Router();

router.get('/', function (req, res) {
    if (!req.session.username) {
        res.render('error', {
            username: "guest",
            title: 'Join & Join',
            message: "Permission denied"
        }); //로그인 안했을때
    } else {
        if (req.session.username == 'admin') {
            res.render('ad-reserv');
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