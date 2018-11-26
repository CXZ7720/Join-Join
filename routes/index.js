var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {

	if (!req.session.username) {
	    res.render('index', {
            username: "guest",
            title: 'Join & Join'
	    }); //로그인 안했을때
	} else {
	    res.render('index', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            title: 'Join & Join'
	    });
	}



});

router.get('/login', function (req, res) {
	res.render('login.ejs');
});

router.get('/register', function (req, res) {
	res.render('register.ejs');
});


module.exports = router;
