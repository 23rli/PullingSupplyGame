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

app.post('/register', (req, res) =>{
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

app.post('/registergame', (req, res) =>{
    const blueCar = req.body.blueCar;
    const bluePenalty = req.body.bluePenalty;
    const greenCar = req.body.greenCar;
    const greenPenalty = req.body.greenPenalty;
    const redCar = req.body.redCar;
    const redPenalty = req.body.redPenalty;
    const yellowCar = req.body.yellowCar;
    const yellowPenalty = req.body.yellowPenalty;
    const rolls = req.body.rolls;
    const mode = req.body.mode;
    const code = req.body.code;
    const blueRevenue = req.body.blueRevenue;
    const greenRevenue = req.body.greenRevenue;
    const redRevenue = req.body.redRevenue;
    const yellowRevenue = req.body.yellowRevenue;
    db.query("INSERT into gameData (blue_car, blue_penalty, green_car, green_penalty,"
        + " red_car, red_penalty, yellow_car, yellow_penalty, rolls, mode, code, blue_revenue," 
        + " green_revenue, red_revenue, yellow_revenue) VALUES  "
        + " (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            blueCar,
            bluePenalty,
            greenCar, 
            greenPenalty, 
            redCar, 
            redPenalty,
            yellowCar,
            yellowPenalty,
            rolls,
            mode,
            code,
            blueRevenue,
            greenRevenue,
            redRevenue,
            yellowRevenue
        ], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send({gameId: result.insertId, mode: result.mode, code: result.code})
        }
    })
})

app.post('/registeruser', (req, res) =>{
    const username = req.body.username;
    const privledge = req.body.privledge;
    const gameId = req.body.gameId;
    db.query("INSERT into users (username, privledge, game) VALUES (?, ?, ?)", [username, privledge, gameId], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send({userId: result.insertId})
        }
    })
})

app.post('/registerround', (req, res) =>{
    const gameId = req.body.gameId;
    const userId = req.body.userId

    const roundNum = req.body.roundNum;
    const mBlue = req.body.mBlue;
    const mGreen = req.body.mGreen;
    const mRed = req.body.mRed;
    const mYellow = req.body.mYellow;
    const aBlue = req.body.aBlue;
    const aGreen = req.body.aGreen;
    const aRed = req.body.aRed;
    const aYellow = req.body.aYellow;
    const qBlue = req.body.qBlue;
    const qGreen = req.body.qGreen;
    const qRed = req.body.qRed;
    const qYellow = req.body.qYellow;
    const pBlue = req.body.pBlue;
    const pGreen = req.body.pGreen;
    const pRed = req.body.pRed;
    const pYellow = req.body.pYellow;
    const dBlue = req.body.dBlue;
    const dGreen = req.body.dGreen;
    const dRed = req.body.dRed;
    const dYellow = req.body.dYellow;
    const WIP = req.body.WIP;
    const doneBlue = req.body.doneBlue;
    const doneGreen = req.body.doneGreen;
    const doneRed = req.body.doneRed;
    const doneYellow = req.body.doneYellow;
    const revenue = req.body.revenue;;

    const rRes = req.body.rRes;
    const yRes = req.body.yRes;
    const bRes = req.body.bRes;
    const rConRes = req.body.rConRes;
    const yConRes = req.body.yConRes;
    const bConRes = req.body.bConRes;
    const unusedR = req.body.unusedR;
    const unusedY = req.body.unusedY;
    const unusedB = req.body.unusedB;
    db.query("INSERT into round "
        + "(game_id, user_id, round_number, manu_b, manu_g, manu_r, manu_y, assem_b, assem_g, assem_r, assem_y,"
        + "qual_b, qual_g, qual_r, qual_y, paint_b, paint_g, paint_r, paint_y, dry_b, dry_g, dry_r, dry_y, wip,"
        + "done_b, done_g, done_r, done_y, revenue, red_res, yel_res, blue_res, rcon_res, ycon_res, bcon_res,"
        + "unusedr, unusedy, unusedb)"
        + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [gameId,
             userId,
             roundNum,
             mBlue,
             mGreen,
             mRed,
             mYellow,
             aBlue,
             aGreen,
             aRed,
             aYellow,
             qBlue,
             qGreen,
             qRed,
             qYellow,
             pBlue,
             pGreen,
             pRed,
             pYellow,
             dBlue,
             dGreen,
             dRed,
             dYellow,
             WIP,
             doneBlue,
             doneGreen,
             doneRed,
             doneYellow,
             revenue,
             rRes,
             yRes,
             bRes,
             rConRes,
             yConRes,
             bConRes,
             unusedR,
             unusedY,
             unusedB
            ], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send({roundId: result.insertId})
        }
    })
})

app.listen(8080, () => {
    console.log("port listening on 8080")
})

