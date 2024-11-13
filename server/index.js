// Import required modules
const express = require('express');           // Express framework for server setup
const app = express();
const cors = require('cors');                 // Middleware for Cross-Origin Resource Sharing
const mysql = require('mysql');               // MySQL database connection
const bodyParser = require('body-parser');    // Middleware for parsing request bodies

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));  // Parse URL-encoded data
app.use(bodyParser.json());                           // Parse JSON data
app.use(cors());                                      // Enable CORS for all routes

// Database connection pool setup
var db = mysql.createPool({
  connectionLimit: 10,            // Maximum concurrent connections
  host: 'localhost',               // Database host
  user: 'root',                    // Database user
  password: 'CC001856',            // Database password
  database: 'MotorCity'            // Target database
});

/**
 * Endpoint to register a new game
 */
app.post('/registergame', (req, res) => {
    // Destructure game data from request body
    const {
        blueCar, bluePenalty, greenCar, greenPenalty, redCar, redPenalty, yellowCar, yellowPenalty,
        rolls, mode, code, blueRevenue, greenRevenue, redRevenue, yellowRevenue, gameState, gameNotes
    } = req.body;

    // SQL query to insert game data into `gameData` table
    db.query("INSERT INTO gameData (blue_car, blue_penalty, green_car, green_penalty, red_car, "
        + "red_penalty, yellow_car, yellow_penalty, rolls, mode, code, blue_revenue, green_revenue, 
        + "red_revenue, yellow_revenue, game_state, game_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        blueCar, bluePenalty, greenCar, greenPenalty, redCar, redPenalty, yellowCar, yellowPenalty,
        rolls, mode, code, blueRevenue, greenRevenue, redRevenue, yellowRevenue, gameState, gameNotes
    ], (err, result) => {
        if (err) {
            console.log(err);                   // Log any SQL errors
            res.status(500).send('Error registering game');  // Send error response
        } else {
            res.send({ gameId: result.insertId, mode, code });  // Send success response with game ID
        }
    });
});

/**
 * Endpoint to register a new user
 */
app.post('/registeruser', (req, res) => {
    // Extract user details from request body
    const { username, privledge, gameId } = req.body;

    // SQL query to insert user data into `users` table
    db.query("INSERT INTO users (username, privledge, game) VALUES (?, ?, ?)", [username, privledge, gameId], (err, result) => {
        if (err) {
            console.log(err);                   // Log any SQL errors
            res.status(500).send('Error registering user');   // Send error response
        } else {
            res.send({ userId: result.insertId });  // Send success response with user ID
        }
    });
});

/**
 * Endpoint to register a new game round
 */
app.post('/registerround', (req, res) => {
    // Destructure round details from request body
    const {
        gameId, userId, roundNum, mBlue, mGreen, mRed, mYellow, aBlue, aGreen, aRed, aYellow,
        qBlue, qGreen, qRed, qYellow, pBlue, pGreen, pRed, pYellow, dBlue, dGreen, dRed, dYellow,
        WIP, doneBlue, doneGreen, doneRed, doneYellow, revenue, rRes, yRes, bRes, rConRes, yConRes, bConRes,
        unusedR, unusedY, unusedB
    } = req.body;

    // SQL query to insert round data into `round` table
    db.query("INSERT INTO round (game_id, user_id, round_number, manu_b, manu_g, manu_r, manu_y, "
        + "assem_b, assem_g, assem_r, assem_y, qual_b, qual_g, qual_r, qual_y, paint_b, paint_g, paint_r, "
        + "paint_y, dry_b, dry_g, dry_r, dry_y, wip, done_b, done_g, done_r, done_y, revenue, red_res, yel_res, "
        + "blue_res, rcon_res, ycon_res, bcon_res, unused_r, unused_y, unused_b)"
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        gameId, userId, roundNum, mBlue, mGreen, mRed, mYellow, aBlue, aGreen, aRed, aYellow,
        qBlue, qGreen, qRed, qYellow, pBlue, pGreen, pRed, pYellow, dBlue, dGreen, dRed, dYellow,
        WIP, doneBlue, doneGreen, doneRed, doneYellow, revenue, rRes, yRes, bRes, rConRes, yConRes, bConRes,
        unusedR, unusedY, unusedB
    ], (err, result) => {
        if (err) {
            console.log(err);                    // Log any SQL errors
            res.status(500).send('Error registering round');  // Send error response
        } else {
            res.send({ roundId: result.insertId });  // Send success response with round ID
        }
    });
});

app.post('/checkcode', (req, res) => {
    const code = req.body.code;

    // Query for the game with matching code and valid state, ordered by creation time
    db.query("SELECT * FROM gameData WHERE code = ? AND (game_state = 'IN PREP' "
        + "OR game_state = 'IN PROGRESS') ORDER BY game_created DESC", [code], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else if (result.length > 0) {
            res.send({ valid: true, gameId: result[0].game_id }); // Send the most recent game ID
        } else {
            res.send({ valid: false, message: 'Invalid Code or Game not in preparation state' });
        }
    });
});

app.post('/gameComponents', (req, res) => {
    const gameId = req.body.gameId;

    // Fetch game details based on game ID
    db.query("SELECT rolls, blue_car, green_car, red_car, yellow_car, blue_revenue, green_revenue, "
        + "red_revenue, yellow_revenue FROM gameData WHERE game_id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else if (result.length > 0) {
            res.send({ valid: true, data: result[0] });
        } else {
            res.send({ valid: false, message: 'Invalid Code' });
        }
    });
});

app.post('/retrieveplayers', (req, res) => {
    const gameId = req.body.gameId;

    // Retrieve player usernames for the specified game
    db.query("SELECT username FROM users WHERE game = ? AND privledge = 'player' ORDER BY username ASC", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.post('/retrievegamestate', (req, res) => {
    const gameId = req.body.gameId;

    // Retrieve game state for the specified game
    db.query("SELECT game_state FROM gameData WHERE game_id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result[0] });
        }
    });
});

app.post('/progressgamestate', (req, res) => {
    const gameId = req.body.gameId;

    // Update game state to 'IN PROGRESS' for specified game
    db.query("UPDATE gameData SET game_state = 'IN PROGRESS' WHERE game_id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database update error' });
        } else if (result.affectedRows > 0) {
            res.send({ success: true, message: 'Game state updated to IN PROGRESS' });
        } else {
            res.send({ success: false, message: 'No game found with the given gameId in IN PREP state' });
        }
    });
});

app.post('/progressgamestatetwo', (req, res) => {
    const gameId = req.body.gameId;

    // Update game state to 'FINISHED' for specified game
    db.query("UPDATE gameData SET game_state = 'FINISHED' WHERE game_id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database update error' });
        } else if (result.affectedRows > 0) {
            res.send({ success: true, message: 'Game state updated to FINISHED' });
        } else {
            res.send({ success: false, message: 'No game found with the given gameId in IN PROGRESS state' });
        }
    });
});

app.post('/retrieveleaderboard', (req, res) => {
    const gameId = req.body.gameId;

    // Retrieve all players in the game for leaderboard
    db.query("SELECT * FROM users WHERE game = ? AND privledge = 'player' ORDER BY username ASC", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.post('/retrieveroundinfo', (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;

    // Retrieve round information for specified user and game
    db.query("SELECT * FROM round WHERE game_id = ? AND user_id = ? ORDER BY round_number DESC", [gameId, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.post('/retrievelimitedroundinfo', (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;
    const roundLimit = req.body.roundLimit;

    // Retrieve limited round info up to specified round limit
    db.query("SELECT * FROM round WHERE game_id = ? AND user_id = ? AND round_number <= ? ORDER BY round_number DESC", [gameId, userId, roundLimit], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.post('/retrieveWIP', (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;
    const roundNum = req.body.roundNum;

    // Retrieve Work in Progress (WIP) status for specified round
    db.query("SELECT WIP FROM round WHERE game_id = ? AND user_id = ? AND round_number = ?", [gameId, userId, roundNum], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.post('/retrievegamedetails', (req, res) => {
    const gameId = req.body.gameId;

    // Retrieve all details for specified game
    db.query("SELECT * FROM gameData WHERE game_id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.listen(8080, () => {
    console.log("port listening on 8080");
});
