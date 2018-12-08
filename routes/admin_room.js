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
    var reservation_query = `SELECT rm.room_number, rm.reserve_id, FR_FirstName as FN, FR_LastName as LN, re.customer_id, name, sm.staff_id, DATE_FORMAT(check_in, "%Y-%m-%d") as check_in, DATE_FORMAT(check_out, "%Y-%m-%d") as check_out, how_many, food_count, extra_service
                            FROM Reservation as re
                            INNER JOIN Room_management as rm ON rm.reserve_id = re.reserve_id
                            INNER JOIN Customer_name as cn ON cn.customer_id = re.customer_id
                            INNER JOIN Staff_management as sm ON rm.staff_id = sm.staff_id
                            ORDER BY rm.room_number;`;
    // 예약번호, 예약자명(회원아이디), 담당직원명(직원아이디), 체크인, 체크아웃, 인원, 조식 횟수, 추가 요구사항
    console.log(reservation_query);
    queryPromise(reservation_query)
        .then((queryResult) => {
            // console.log(queryResult);
            res.render('ad-room', {
                reservation: queryResult
            });
        })
        .catch((err) => {
            console.error(err);
        });



});

module.exports = router;