var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('reserv1');
});


router.post('/step2', function (req, res) {
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

router.post('/step3', function (req, res) {
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

router.post('/step4', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_type = req.body.room_type;
    var breakfast_cnt = req.body.breakfast_cnt;
    var card = req.body.card;
    var card_date = req.body.date;

    // var room_query  = "select * from ";

    res.render('reserv4', {
        check_in: check_in,
        check_out: check_out,
        howmany: howmany,
        room_type: room_type,
        breakfast_cnt: breakfast_cnt,
        card: card,
        card_date: card_date
    });
});

module.exports = router;