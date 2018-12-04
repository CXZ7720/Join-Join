var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('ad-staff');
});

module.exports = router;