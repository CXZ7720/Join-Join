var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('reserve1');
});

router.post('/step2', function (req, res) {
    res.render('reserve2');
});

router.post('/step3', function (req, res) {
    res.render('reserve3');
});

router.post('/step4', function (req, res) {
    res.render('reserve4');
});

module.exports = router;