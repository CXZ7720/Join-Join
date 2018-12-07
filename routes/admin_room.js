var router = require('express').Router();
var conn = require('./db');
const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, res) => {
            if (err) reject(err)
            else resolve(res)
        })
    })
}


router.get('/', function (req, res) {
    
    var date = new Date().toISOString().split('T')[0];
    console.log(date);
    var reservation_query = `SELECT room_number, food_count, DATE_FORMAT(check_in, "%Y-%m-%d") AS check_in, DATE_FORMAT(check_out, "%Y-%m-%d") AS check_out, how_many, extra_service as ext FROM Reservation WHERE check_in <= '${date}' AND check_out >= '${date}' order by room_number;`;
    console.log(reservation_query);
    queryPromise(reservation_query)
        .then((queryResult) => {
            // console.log(queryResult);
            res.render('ad-room',{
                reservation : queryResult
            });
        })
        .catch((err) => {
            console.error(err);
        });



});

module.exports = router;