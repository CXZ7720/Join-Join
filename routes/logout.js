var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
        req.session.username = 'guest';
});

module.exports = router;