var router = require('express').Router();


router.post('/', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_type = req.body.room_type;
    var breakfast_cnt = req.body.breakfast_cnt;
    // var room_query  = "select * from ";

    res.render('reserv3', {
        check_in: check_in,
        check_out: check_out,
        howmany: howmany,
        room_type: room_type,
        breakfast_cnt: breakfast_cnt,
    });
});

module.exports = router;