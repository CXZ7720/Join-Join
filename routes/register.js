var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('registeration');
});

module.exports = router;