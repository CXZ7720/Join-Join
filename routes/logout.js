var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
        req.session.destroy();
        res.redirect('/index');
});

module.exports = router;