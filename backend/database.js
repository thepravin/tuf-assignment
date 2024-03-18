const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'takeyouforward',
    password:'21141217'
})




module.exports = connection