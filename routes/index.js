var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
	console.log("INDEX_ROUTER");
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

module.exports = router;