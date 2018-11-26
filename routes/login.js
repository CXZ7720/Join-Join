var router = require('express').Router();

router.get('/login', function (req, res) {
    res.render('login.ejs');
});

module.exports = router;