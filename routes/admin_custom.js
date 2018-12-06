var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('ad-custom');
});

module.exports = router;