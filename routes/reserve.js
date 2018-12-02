var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('reserve');
});

module.exports = router;