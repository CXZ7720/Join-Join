var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('ad-reserv');
});

module.exports = router;