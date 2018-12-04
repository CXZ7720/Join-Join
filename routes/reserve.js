var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('reserv1');
});

module.exports = router;