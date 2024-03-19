const express = require("express");
const app = express();
const connection = require("./database")
const cors = require('cors')

app.use(cors());

app.use(express.json())


app.post('/insertdata', (req, res) => {
    const sql = "INSERT INTO codeentries (`username`, `code_language`, `stdin`, `source_code`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.username,
        req.body.code_language,
        req.body.stdin,
        req.body.source_code
    ];

    connection.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.json(err);
        }
        return res.json(data);
    });
});


app.get('/getentries', (req, res) => {
    const sql = "SELECT username, code_language, stdin,source_code, timestamp FROM codeentries";
    connection.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching entries:", err);
            return res.json(err);
        }
        return res.json(data);
    });
});



module.exports = app