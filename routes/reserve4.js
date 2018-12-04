var router = require('express').Router();

router.post('/', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_type = req.body.room_type;
    var breakfast_cnt = req.body.breakfast_cnt;
    var card = req.body.card;
    var card_month = req.body.month;
    var card_year = req.body.year;
    // var room_query  = "select * from ";

    res.render('reserv4', {
        check_in: check_in,
        check_out: check_out,
        howmany: howmany,
        room_type: room_type,
        breakfast_cnt: breakfast_cnt,
        card: card,
        card_month: card_month,
        card_year: card_year
    });
});

module.exports = router;