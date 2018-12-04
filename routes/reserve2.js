var router = require('express').Router();


router.post('/', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_query = "select * from ";

    res.render('reserv2', {
        check_in: check_in,
        check_out: check_out,
        howmany: howmany
    });
});

module.exports = router;