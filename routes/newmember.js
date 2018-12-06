var router = require('express').Router();
var conn = require('./db');

const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

/* GET home page. */
router.post('/', function (req, res) {
    var KR_FirstName =  req.body.KR_FirstName;
    var KR_LastName = req.body.KR_LastName;
    var FR_FirstName = req.body.FR_FirstName;
    var FR_LastName = req.body.FR_LastName;

    var InputBirthday = req.body.InputBirthday;
    var InputGender = req.body.InputGender;
    var InputEmail = req.body.InputEmail;

    var InputPhone = req.body.InputPhone;
    var InputID = req.body.InputID;
    var InputPassword = req.body.InputPassword;

    var name_query = `Insert into Customer_name (KR_FirstName, KR_LastName, FR_FirstName, FR_LastName) values ('${KR_FirstName}', '${KR_LastName}', '${FR_FirstName}', '${FR_LastName}');`;
    var get_nameID_query = `select name_id from Customer_name where FR_FirstName = '${FR_FirstName}' and FR_LastName = '${FR_LastName}';`;

    console.log(`Executing "${name_query}"`)
    queryPromise(name_query)
        .then((queryResult) => {
            console.log(`changed ${queryResult.changedRows} row(s)`);
            console.log("USER " + KR_FirstName + KR_LastName + FR_FirstName + FR_LastName + " was inserted.");
            return queryPromise(get_nameID_query)
        })
        .then((queryResult) => {
            console.log(queryResult[0])
            var name_id = queryResult[0]['name_id']
            var adduser_query = `Insert into Customer_info (name_id, birthday, gender, email, phone, login_ID, password) values (${name_id}, '${InputBirthday}', '${InputGender}', '${InputEmail}', '${InputPhone}', '${InputID}', '${InputPassword}');`;
            return queryPromise(adduser_query)
        })
        .then((queryResult) => {
            console.log(`changed ${queryResult.changedRows} row(s)`);
            res.redirect('/index');
        })
        .catch((err) => {
            console.error(err)
        })

    // conn.query(name_query, function(err, res){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(`changed ${res.changedRows} row(s)`);
    //         console.log("USER " + KR_FirstName + KR_LastName + FR_FirstName + FR_LastName +" was inserted.");
    //     }
    // });
    // ////////////////////////////여기가 문제야~~~~~~~~nameID////////////////////////////
    // conn.query(get_nameID_query, name_id, function(err, res) {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         name_id = res[0]['name_id'];
    //     }
    // });

    // conn.query(adduser_query, function(err, res){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(`changed ${res.changedRows} row(s)`);
    //         window.alert("회원가입에 성공하였습니다.")
    //         res.redirect('/index');
    //     }
    // });

});

module.exports = router;