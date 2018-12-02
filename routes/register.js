var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('register');
});

module.exports = router;