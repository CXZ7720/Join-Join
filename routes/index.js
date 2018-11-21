var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
	console.log('Connect : /');
    res.render('index.ejs', {
        title: 'Join & Join'
    });
});

router.get('/login', function (req, res) {
	res.render('login.ejs');
});

router.get('/register', function (req, res) {
	res.render('register.ejs');
});


module.exports = router;
