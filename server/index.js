const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

var db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'CC001856',
  database        : 'MotorCity'
});

app.post('/signup', (req, res) =>{
    const test = req.body.test;
    const comment = req.body.comment;
    db.query("INSERT into test (name, comment) VALUES (?, ?)", [test, comment], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send({test: test})
        }
    })
})

app.listen(8080, () => {
    console.log("port listening on 8080")
})
