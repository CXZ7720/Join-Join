var router = require('express').Router();
var conn = require('./db');
router.get('/', function (req, res) {
    if (!req.session.username) {
        res.render('reserv1', {
            username: "guest",
            title: 'Join & Join'
        }); //로그인 안했을때
    } else {
        res.render('reserv1', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            title: 'Join & Join'
        });
    }
});


router.post('/step2', function (req, res) {

    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var now = new Date(); 
    var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var specificDate1 = new Date(check_in);
    var specificDate2 = new Date(check_out);
    if (todayAtMidn.getTime() == specificDate1.getTime() || specificDate2-specificDate1<0)
    {   
        res.send("<script>alert('오늘날짜이거나 체크아웃 날짜가 체크인 날짜보다 앞설수는 없습니다.');history.back();</script>");
    }else {
        var room_query = `SELECT room_number from Reservation except SELECT * FROM Reservation WHERE check_in > DATE(${check_in}) AND check_out < DATE(${check_out});`;
        var available_room = [];
        
        conn.query(room_query, function(err, res){
            if(err){
                console.log(err);
            } else {
                available_room.append(res[0]['room_number']);
            }
        })


        if (!req.session.username) {
            res.render('reserv2', {
                username: "guest",
                title: 'Join & Join',
                check_in: check_in,
                check_out: check_out,
                howmany: howmany
            }); //로그인 안했을때
        } else {
            res.render('reserv2', { //로그인 했을때
                username: req.session.username, //username을 같이 넘겨줌.
                title: 'Join & Join',
                check_in: check_in,
                check_out: check_out,
                howmany: howmany
            });
        }
    }
});

router.post('/step3', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_type = req.body.room_type;
    var breakfast_cnt = req.body.breakfast_cnt;
    // var room_query  = "select * from ";

    if (!req.session.username) {
        res.render('reserv3', {
            username: "guest",
            title: 'Join & Join',
            check_in: check_in,
            check_out: check_out,
            howmany: howmany,
            room_type: room_type,
            breakfast_cnt: breakfast_cnt,
        }); //로그인 안했을때
    } else {
        res.render('reserv3', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            title: 'Join & Join',
            check_in: check_in,
            check_out: check_out,
            howmany: howmany,
            room_type: room_type,
            breakfast_cnt: breakfast_cnt,
        });
    }
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

    if (!req.session.username) {
        res.render('reserv4', {
            username: "guest",
            title: 'Join & Join',
            check_in: check_in,
            check_out: check_out,
            howmany: howmany,
            room_type: room_type,
            breakfast_cnt: breakfast_cnt,
            card: card,
            card_date: card_date
        }); //로그인 안했을때
    } else {
        res.render('reserv4', { //로그인 했을때
            username: req.session.username, //username을 같이 넘겨줌.
            title: 'Join & Join',
            check_in: check_in,
            check_out: check_out,
            howmany: howmany,
            room_type: room_type,
            breakfast_cnt: breakfast_cnt,
            card: card,
            card_date: card_date
        });
    }
});

module.exports = router;