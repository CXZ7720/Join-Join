var router = require('express').Router();
var conn = require('./db');
// require("date-format-lite")

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

const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, res) => {
            if (err) reject(err)
            else resolve(res)
        })
    })
}
function change_Date(data) {
    // var d = '12-07-2016';
    var date = data.split("/");
    var edit_date = date[2] + "-" + date[0] + "-" + date[1];
    return edit_date;
}

router.post('/step2', function (req, res) {
    console.log(req.body.check_in);
    var check_in = change_Date(req.body.check_in);
    var check_out = change_Date(req.body.check_out);
    var howmany = req.body.howmany;
    //SELECT room_number FROM Room WHERE room_number NOT IN (SELECT room_number FROM Reservation WHERE DATE_FORMAT(check_in,"%m/%d/%Y") > DATE_FORMAT('2018-01-15',"%m/%d/%Y") AND DATE_FORMAT(check_out,"%m/%d/%Y") < DATE_FORMAT('2018-01-20',"%m/%d/%Y"));
    var room_query = `SELECT grade, room_number FROM Room WHERE room_number NOT IN (SELECT distinct room_number FROM Reservation WHERE check_in >= DATE('${check_in}') AND check_out <= DATE('${check_out}')) GROUP BY grade order by room_number;`;
    console.log(room_query);

    queryPromise(room_query)
        .then((queryResult) => {
            console.log(room_query);
            console.log(queryResult);
            if (!req.session.username) {
                res.render('reserv2', {
                    room_list: queryResult,
                    username: "guest",
                    title: 'Join & Join',
                    check_in: check_in,
                    check_out: check_out,
                    howmany: howmany
                }); //로그인 안했을때
            } else {
                res.render('reserv2', { //로그인 했을때
                    room_list: queryResult,
                    username: req.session.username, //username을 같이 넘겨줌.
                    title: 'Join & Join',
                    check_in: check_in,
                    check_out: check_out,
                    howmany: howmany
                });
            }
        })
        .catch((err) => {
            console.error(err)
        });



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
    var card_number = req.body.card_number
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
            card_number: card_number,
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
            card_number: card_number,
            card_date: card_date
        });
    }
});

router.post('/reserv_fin', function (req, res) {
    var check_in = req.body.check_in;
    var check_out = req.body.check_out;
    var howmany = req.body.howmany;
    var room_number = req.body.room_type; //values= 방 번호를 넘겨줌.
    var breakfast_cnt = req.body.breakfast_cnt;
    var card = req.body.card;
    var card_number = req.body.card_num;
    var card_date = req.body.card_date;
    var date = new Date().toISOString().split('T')[0];

    var card_info_query = `insert into Card_info (company, card_num, end_date) values ("${card}", "${card_number}", "${card_date}");`;
    var get_cardID_query = `select card_id from Card_info where card_num = "${card_number}" and company='${card}' and end_date='${card_date}';`;
    console.log(card_info_query);
    var user_id = req.session.customer_id;

    queryPromise(card_info_query)
        .then((queryResult) => {
            console.log("card_info : "+queryResult);
            console.log("card_id_query => " + get_cardID_query);
            return queryPromise(get_cardID_query);
        })
        .then((queryResult) => {
            console.log(queryResult);
            var card_id = queryResult[0].card_id;
            var reserve_query = `Insert into Reservation (reserve_date, room_number, food_count, customer_id, check_in, check_out, how_many, card_id) values (DATE('${date}'), ${room_number}, ${breakfast_cnt}, ${user_id}, '${check_in}', '${check_out}', ${howmany}, ${card_id})`;
            console.log("reserve_query => "+ reserve_query);
            return queryPromise(reserve_query);
        })
        .then((queryResult) => {
            console.log(`changed ${queryResult.changedRows} row(s)`);
            res.redirect('/index');
        })
        .catch((err) => {
            console.error(err);
        });

});


module.exports = router;