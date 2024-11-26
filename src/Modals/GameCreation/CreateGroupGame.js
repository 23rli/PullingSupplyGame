import React, { useState, useEffect } from 'react';
import { Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, TextField, Typography, Button } from '@mui/material';
//update

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export function CreateGroupGame({ roundManager, onStart, openAdmin }) {
    const [openIntro, setOpenIntro] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openWaitJoin, setOpenWaitJoin] = useState(false);
    const [openWaitCreate, setOpenWaitCreate] = useState(false);

    const [reUseGame, setReUseGame] = useState(false);
    const [evanDalton, setEvanDalton] = useState(false);

    const [blueChecked, setBlueChecked] = useState(false);
    const [greenChecked, setGreenChecked] = useState(false);
    const [redChecked, setRedChecked] = useState(false);
    const [yellowChecked, setYellowChecked] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);
    const [timePerUpdate, setTimePerUpdate] = useState(2);
    const [checkUsers, setCheckUsers] = useState(false);
    const [checkGameStatus, setCheckGameStatus] = useState(false);

    const [errorStatement, setErrorStatement] = useState("");

    const [gamePlayers, setGamePlayers] = useState([])
    const [code, setCode] = useState(0);
        // Timer Effect
        useEffect(() => {
            const timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
    
            return () => clearInterval(timer);
        }, []);
    
        // Check Game Status Effect
        useEffect(() => {
            const checkStatus = async () => {

                if (checkGameStatus && elapsedTime >= timePerUpdate) {
        
                    try {
                        const requestId = uuidv4()
                        const response = await axios.post('http://3.129.12.15:8080/retrievegamestate', {
                            gameId: roundManager.gameId,
                            requestId: requestId
                        });

        
                        if (response.data.data.game_state === 'IN PROGRESS') {
                            setCheckGameStatus(false);
                            handleCloseWaitJoin();
                            onStart();
                        }
                    } catch (error) {
                        console.error('Error registering:', error);
                    }
                    setElapsedTime(0); // Reset elapsedTime after a successful check
                }
            };
        
            checkStatus();
        }, [elapsedTime, checkGameStatus, timePerUpdate, roundManager, onStart]);
        
    
        // Retrieve Players Effect
        useEffect(() => {
            const getPlayers = async () => {

                if (checkUsers && elapsedTime >= timePerUpdate) {
                    try {
                        const requestId = uuidv4()
                        const response = await axios.post('http://3.129.12.15:8080/retrieveplayers', {
                            gameId: roundManager.gameId,
                            requestId: requestId
                        });
                        let players = [];
                        for(let i = 0; i <  response.data.data.length; i++){
                            players.push(response.data.data[i].username)
                        }
                        console.log(response);
                        console.log(players);
                        setGamePlayers(players);
                    } catch (error) {
                        console.error('Error registering:', error);
                    }
                    setElapsedTime(0); // Reset elapsedTime after a successful fetch
                }
            };
    
            getPlayers();
        }, [elapsedTime, checkUsers, timePerUpdate, roundManager]);
    

    const handleGameStart = () => {

        const updateGameState = async () => {

            try {
                const requestId = uuidv4()
                const response = await axios.post('http://3.129.12.15:8080/progressgamestate', {
                    gameId: roundManager.gameId,
                    requestId: requestId
                });
                
            } catch (error) {
                console.error('Error registering:', error);
            }

        }

        updateGameState()
        handleCloseWaitCreate();
        openAdmin();
    }

    const handleReUseChange = (event) => {
        setReUseGame(event.target.checked);
    };

    const handleEvanDalton = (event) => {
        setEvanDalton(event.target.checked);
        console.log("checked eD")
    };

    const handleBlueCheckChange = (event) => {
        setBlueChecked(event.target.checked);
    };

    const handleCloseBlue = () => {
        setBlueChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleGreenCheckChange = (event) => {
        setGreenChecked(event.target.checked);
    };

    const handleCloseGreen = () => {
        setGreenChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleRedCheckChange = (event) => {
        setRedChecked(event.target.checked);
    };

    const handleCloseRed = () => {
        setRedChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleYellowCheckChange = (event) => {
        setYellowChecked(event.target.checked);
    };

    const handleCloseYellow = () => {
        setYellowChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleOpenIntro = () => {
        setOpenIntro(true);
    };

    const handleCloseIntro = () => {
        setOpenIntro(false);
    };

    const handleOpenJoin = () => {
        setOpenIntro(false);
        setOpenJoin(true);
    };

    const handleCloseJoin = () => {
        setOpenJoin(false);
    };
    const handleOpenCreate = () => {
        setOpenIntro(false);
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    const handleOpenWaitJoin = () => {
        setOpenJoin(false);
        setOpenWaitJoin(true);
    };

    const handleCloseWaitJoin = () => {
        setOpenWaitJoin(false);
    };

    const handleOpenWaitCreate = () => {
        setOpenCreate(false);
        setCheckUsers(true);
        setOpenWaitCreate(true);
    };

    const handleCloseWaitCreate = () => {
        setOpenWaitCreate(false);
    };

    const handleRecycleGame = async (oldId, username, gameNotes) => {
        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/retrievegamedetails', {
                gameId: oldId,
                requestId: requestId
            });
            // Generate the unique game code
            const createCode = parseInt(Math.random() * 9 + 1) * 100000 +
                               parseInt(Math.random() * 10) * 10000 +
                               parseInt(Math.random() * 10) * 1000 +
                               parseInt(Math.random() * 10) * 100 +
                               parseInt(Math.random() * 10) * 10 +
                               parseInt(Math.random() * 10);
            
            // Map response data to extract individual values for each required input
            const gameData = response.data.data;

            const gameTable = gameData.map(row => ({
                rolls: row.rolls,
                blueCar: row.blue_car,
                greenCar: row.green_car,
                redCar: row.red_car,
                yellowCar: row.yellow_car,
                bluePenalty: row.blue_penalty,
                greenPenalty: row.green_penalty,
                redPenalty: row.red_penalty,
                yellowPenalty: row.yellow_penalty,
                blueRevenue: row.blue_revenue,
                greenRevenue: row.green_revenue,
                redRevenue: row.red_revenue,
                yellowRevenue: row.yellow_revenue
            }));
            
            // Assuming gameTable has a single entry; adjust if handling multiple rows differently
            const {
                rolls,
                blueCar, bluePenalty, blueRevenue,
                greenCar, greenPenalty, greenRevenue,
                redCar, redPenalty, redRevenue,
                yellowCar, yellowPenalty, yellowRevenue
            } = gameTable[0]; // Access the first game if multiple rows


            
            
            // Call handleCreateGame with the mapped data
            handleCreateGame(
                username, 
                blueCar, bluePenalty, greenCar, greenPenalty,
                redCar, redPenalty, yellowCar, yellowPenalty,
                rolls, createCode, 
                blueRevenue, greenRevenue, redRevenue, yellowRevenue,
                gameNotes
            );
            

            handleOpenWaitCreate();

        } catch (error) {
            console.error('Error registering:', error);
        }
    }

    const handleCreateGame = async (
        username,
        blueCar, bluePenalty,
        greenCar, greenPenalty,
        redCar, redPenalty,
        yellowCar, yellowPenalty,
        rolls, code,
        blueRevenue, greenRevenue,
        redRevenue, yellowRevenue,
        gameNotes
    ) => {
        
        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/registergame', {
                blueCar: blueCar,
                bluePenalty: bluePenalty,
                greenCar: greenCar,
                greenPenalty: greenPenalty,
                redCar: redCar,
                redPenalty: redPenalty,
                yellowCar: yellowCar,
                yellowPenalty: yellowPenalty,
                rolls: rolls,
                mode: 1,
                code: code,
                blueRevenue: blueRevenue,
                greenRevenue: greenRevenue,
                redRevenue: redRevenue,
                yellowRevenue: yellowRevenue,
                gameState: "IN PREP",
                gameNotes: gameNotes,
                requestId: requestId
            });

 
            setCode(code)
            roundManager.gameId = response.data.gameId; // Accessing 'gameId'
            roundManager.setGameResources(rolls);
            roundManager.setMode(2);
            roundManager.setCars(blueCar, greenCar, redCar, yellowCar);
            roundManager.setWIPPen(bluePenalty, greenPenalty, redPenalty, yellowPenalty);
            roundManager.setRevenue(blueRevenue, greenRevenue, redRevenue, yellowRevenue);
            roundManager.setShortTermMem();
            handleCreateModerator(username);

        } catch (error) {
            console.error('Error registering:', error);
        }
    };


    const handleCreateModerator = async (username) => {
        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/registeruser',
                {
                    username: username,
                    privledge: "moderator",
                    gameId: roundManager.gameId,
                    requestId: requestId
                })
            roundManager.userId = response.data.userId; // Accessing 'newId' instead of 'id'
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleCreatePlayer = async (username) => {
        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/registeruser',
                {
                    username: username,
                    privledge: "player",
                    gameId: roundManager.gameId,
                    requestId: requestId
                })
            roundManager.userId = response.data.userId; // Accessing 'newId' instead of 'id'
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const checkValidity = async (code) => {

        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/checkcode',
                {
                    code: code,
                    requestId: requestId
                })

            roundManager.gameId = response.data.gameId;
            return response.data.valid;
        } catch (error) {
            console.error('Error registering:', error);
        }

        return false;
    };

    const checkUniqueness = async (username) => {

        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/retrieveplayers', {
                gameId: roundManager.gameId,
                requestId: requestId
            });
            for(let i = 0; i <  response.data.data.length; i++){
                if(username === response.data.data[i].username){
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error registering:', error);
        }

        return false;
    };
    const joinGame = async ({ roundManager, username }) => {

        try {
            const requestId = uuidv4()
            const response = await axios.post('http://3.129.12.15:8080/gameComponents',
                {
                    gameId: roundManager.gameId,
                    requestId: requestId
                })

            const data = response.data.data;

            roundManager.setGameResources(data.rolls)
            roundManager.setMode(1)
            roundManager.setCars(data.blue_car, data.green_car, data.red_car, data.yellow_car)
            roundManager.setRevenue(data.blue_revenue, data.green_revenue, data.red_revenue, data.yellow_revenue)
            handleCreatePlayer(username);

        } catch (error) {
            console.error('Error registering:', error);
        }
    }





    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleOpenIntro}
                sx={{
                    fontSize: '1.5rem', // Adjust font size to make it larger
                    color: '#2c387e', // Text color
                    backgroundColor: 'white', // Background color
                    borderColor: 'white', // Border color
                    padding: '10px 20px', // Padding to make it larger
                    margin: '20px', // Margin
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color on hover
                        borderColor: 'white', // Border color on hover
                    }
                }}
            >
                Team Game
            </Button>
            <Dialog
                open={openIntro}
                onClose={handleCloseIntro}
            >
                <DialogTitle>Team Game</DialogTitle>
                <DialogContent>
                    <Button onClick={handleOpenJoin}>Join Game</Button>
                    <Button onClick={handleOpenCreate}>Create Game</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIntro}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openJoin}
                onClose={handleCloseJoin}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => { // Make the function async
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());

                        const username = formJson.username;
                        const code = formJson.code;

                        try {
                            // Await the result of checkValidity
                            const valid = await checkValidity(code);
                            const unique = await checkUniqueness(username);

                            if (valid & unique) {

                                joinGame({ roundManager, username });
                                handleOpenWaitJoin();
                                setCheckGameStatus(true);
                            } else if (!valid){
                                setErrorStatement("Invalid Code. Please try again.");
                            }else{
                                setErrorStatement("The username is already taken. Please try another one");
                            }
                        } catch (error) {
                            console.error('Error during form submission:', error);
                        }
                    },
                }}
            >
                <DialogTitle>Join Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To join a game, input the 6 digit code provided by your game creator
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="username"
                        label="Username"
                        type="text"
                        defaultValue={"Guest"}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="code"
                        label="6 Digit Game Code"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <DialogContentText style={{ color: 'red', margin: '16px 0' }}>
                        {errorStatement !== '' && errorStatement}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseJoin}>Cancel</Button>
                    <Button type="submit">Join</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openCreate}
                onClose={handleCloseCreate}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const username = formJson.username;
                        const gameNotes = formJson.gameNotes;
                        const evanDalton = formJson.evanDalton;
                        if(!reUseGame){
                            const blueRevenue = formJson.blueRevenue;
                            const greenRevenue = formJson.greenRevenue;
                            const redRevenue = formJson.redRevenue;
                            const yellowRevenue = formJson.yellowRevenue;
                            const bluePenalty = formJson.blueWIPPenalty;
                            const greenPenalty = formJson.greenWIPPenalty;
                            const redPenalty = formJson.redWIPPenalty;
                            const yellowPenalty = formJson.yellowWIPPenalty;
                            const blueCar = blueChecked ? 1 : 0;
                            const greenCar = greenChecked ? 1 : 0;
                            const redCar = redChecked ? 1 : 0;
                            const yellowCar = yellowChecked ? 1 : 0;

                            const createCode = parseInt(Math.random() * 9 + 1) * 100000 + parseInt(Math.random() * 10) * 10000 + parseInt(Math.random()
                                * 10) * 1000 + parseInt(Math.random() * 10) * 100 + parseInt(Math.random() * 10) * 10 + parseInt(Math.random() * 10);

                            let rolls = '';

                            if(!evanDalton){
                                for (let i = 0; i < 100; i++) {
                                    const red = parseInt(Math.random() * 10 + 1);
                                    const yellow = parseInt(Math.random() * 8 + 1);
                                    const blue = parseInt(Math.random() * 4 + 1);
                                    rolls += red + ",";
                                    rolls += yellow + ",";
                                    rolls += blue + ",";
                                }
                            }else{
                                console.log("Edalton rolls used")
                                rolls = "8,6,2,7,4,3,10,6,1,6,2,2,6,2,1,9,2,3,7,7,2,5,4,4,5,6,3,3,3,4,4,2,1,5,5,3,3,6,2,6,1,3,1,3,2,2,2,2,7,5,2,4,3,4,5,6,3,4,8,3,8,7,2,7,6,3,6,3,2,5,6,4,5,8,2";
                            }

                            handleCreateGame(username, blueCar, bluePenalty, greenCar, greenPenalty,
                                redCar, redPenalty, yellowCar, yellowPenalty, rolls, createCode, blueRevenue, greenRevenue,
                                redRevenue, yellowRevenue, gameNotes);

                            handleOpenWaitCreate();
                        }else{
                            const oldId = formJson.oldGameID;
                            
                            handleRecycleGame(oldId, username, gameNotes);
                        }
                    },
                }}
            >
                <DialogTitle>Create Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adjust the Parameters to Begin
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="username"
                        label="Username"
                        type="text"
                        variant="standard"
                        defaultValue={"Guest"}
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={reUseGame}
                                onChange={handleReUseChange}
                                name="reUse"
                                color="primary"
                            />
                        }
                        label="Reuse old Game"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={evanDalton}
                                onChange={handleEvanDalton}
                                name="EvanDalton"
                                color="primary"
                            />
                        }
                        label="Evan Dalton Numbers"
                    />
                    <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="oldGameID"
                                label="Insert old Game Id (EX: 147)"
                                type="number"
                                variant="standard"
                                defaultValue={0}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={!reUseGame}
                            />
                        </Grid>

                    <Collapse in={!reUseGame}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={blueChecked}
                                        onChange={handleBlueCheckChange}
                                        name="enableBlue"
                                        color="primary"
                                    />
                                }
                                label="Enable Blue Cars"
                                disabled={reUseGame}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="blueRevenue"
                                label="Blue Revenue per Car"
                                type="number"
                                variant="standard"
                                defaultValue={3.00}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !blueChecked}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="blueWIPPenalty"
                                label="Blue WIP Penalty"
                                type="number"
                                variant="standard"
                                defaultValue={1.50}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !blueChecked}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={greenChecked}
                                        onChange={handleGreenCheckChange}
                                        name="enableGreen"
                                        color="primary"
                                    />
                                }
                                label="Enable Green Cars"
                                disabled={reUseGame}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="greenRevenue"
                                label="Green Revenue per Car"
                                type="number"
                                variant="standard"
                                defaultValue={2.00}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !greenChecked}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="greenWIPPenalty"
                                label="Green WIP Penalty"
                                type="number"
                                variant="standard"
                                defaultValue={1.00}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !greenChecked}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={redChecked}
                                        onChange={handleRedCheckChange}
                                        name="enableRed"
                                        color="primary"
                                    />
                                }
                                label="Enable Red Cars"
                                disabled={reUseGame}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="redRevenue"
                                label="Red Revenue per Car"
                                type="number"
                                variant="standard"
                                defaultValue={2.50}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !redChecked}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="redWIPPenalty"
                                label="Red WIP Penalty"
                                type="number"
                                variant="standard"
                                defaultValue={1.25}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !redChecked}
                                
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={yellowChecked}
                                        onChange={handleYellowCheckChange}
                                        name="enableYellow"
                                        color="primary"
                                    />
                                }
                                label="Enable Yellow Cars"
                                disabled={reUseGame}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="yellowRevenue"
                                label="Yellow Revenue per Car"
                                type="number"
                                variant="standard"
                                defaultValue={2.50}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !yellowChecked}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                margin="dense"
                                name="yellowWIPPenalty"
                                label="Yellow WIP Penalty"
                                type="number"
                                variant="standard"
                                defaultValue={1.25}
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                }}
                                fullWidth
                                disabled={reUseGame || !yellowChecked}
                            />
                        </Grid>
                        
                    </Grid>
                    </Collapse>
                    <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="gameNotes"
                                label="Game Notes"
                                type="text"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                </DialogContent>

                <DialogActions>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openWaitCreate}
                onClose = {handleCloseWaitCreate}
            >
                <DialogTitle>Waiting on Players</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Game Code: {code}
                    </DialogContentText>
                    <DialogContentText>
                        To start the game, press start. Players will be displayed here:
                        <div>
                            {/* Render your component here */}
                            <div>Players: {gamePlayers.join(', ')}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleGameStart()}>
                        Start Game
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openWaitJoin}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleCloseWaitJoin();
                    }
                }}
            >
                <DialogTitle>Waiting to Join</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please wait for the game to begin
                    </DialogContentText>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
