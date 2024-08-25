import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Grid } from '@mui/material'

import axios from 'axios';

export function CreateGroupGame({ roundManager, onStart, openAdmin }) {
    const [openIntro, setOpenIntro] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openWaitJoin, setOpenWaitJoin] = useState(false);
    const [openWaitCreate, setOpenWaitCreate] = useState(false);

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
                console.log("In CheckStatus");
                console.log("checkGameStatus:", checkGameStatus);
                console.log("elapsedTime:", elapsedTime);
                console.log("checkUSers:", checkUsers);
                console.log("timePerUpdate:", timePerUpdate);
        
                if (checkGameStatus && elapsedTime >= timePerUpdate) {
                    console.log("Checking Status");
        
                    try {
                        const response = await axios.post('http://localhost:8080/retrievegamestate', {
                            gameId: roundManager.gameId
                        });
                        console.log("Response:", response);
                        console.log(response.data.data)
        
                        if (response.data.data.game_state === 'IN PROGRESS') {
                            console.log("reach transition")
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
                console.log("In Get Players" )
                console.log(checkUsers)
                console.log(elapsedTime >= timePerUpdate)
                if (checkUsers && elapsedTime >= timePerUpdate) {
                    console.log("Checking players")
                    try {
                        const response = await axios.post('http://localhost:8080/retrieveplayers', {
                            gameId: roundManager.gameId
                        });
                        console.log(response.data.data)
                        let players = [];
                        for(let i = 0; i <  response.data.data.length; i++){
                            players.push(response.data.data[i].username)
                        }
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
        console.log(roundManager)
        const updateGameState = async () => {

            try {
                const response = await axios.post('http://localhost:8080/progressgamestate', {
                    gameId: roundManager.gameId
                });
            } catch (error) {
                console.error('Error registering:', error);
            }

        }

        updateGameState()
        handleCloseWaitCreate();
        openAdmin();
    }

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

    const handleCreateGame = async (
        username,
        blueCar, bluePenalty,
        greenCar, greenPenalty,
        redCar, redPenalty,
        yellowCar, yellowPenalty,
        rolls, code,
        blueRevenue, greenRevenue,
        redRevenue, yellowRevenue
    ) => {
        console.log(code)
        try {
            const response = await axios.post('http://localhost:8080/registergame', {
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
                gameState: "IN PREP"
            });

            console.log(response.data); // Log the response data
            console.log(code)

            setCode(code)
            roundManager.gameId = response.data.gameId; // Accessing 'gameId'
            roundManager.setGameResources(rolls)
            roundManager.setCars(blueCar, greenCar, redCar, yellowCar)
            roundManager.setRevenue(blueRevenue, greenRevenue, redRevenue, yellowRevenue)
            console.log(roundManager);
            handleCreateModerator(username);

        } catch (error) {
            console.error('Error registering:', error);
        }
    };


    const handleCreateModerator = async (username) => {
        console.log("reached create user")
        try {
            const response = await axios.post('http://localhost:8080/registeruser',
                {
                    username: username,
                    privledge: "moderator",
                    gameId: roundManager.gameId
                })
            roundManager.userId = response.data.userId; // Accessing 'newId' instead of 'id'
            console.log(roundManager);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleCreatePlayer = async (username) => {
        console.log("reached create user")
        try {
            const response = await axios.post('http://localhost:8080/registeruser',
                {
                    username: username,
                    privledge: "player",
                    gameId: roundManager.gameId
                })
            roundManager.userId = response.data.userId; // Accessing 'newId' instead of 'id'
            console.log(roundManager);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const checkValidity = async (code) => {
        console.log("reached check validity")
        try {
            const response = await axios.post('http://localhost:8080/checkcode',
                {
                    code: code
                })
            console.log(response.data.gameId)
            roundManager.gameId = response.data.gameId;
            console.log(roundManager);
            return response.data.valid;
        } catch (error) {
            console.error('Error registering:', error);
        }

        return false;
    };

    const joinGame = async ({ roundManager, username }) => {
        console.log("From Join Game")
        console.log(roundManager)
        try {
            const response = await axios.post('http://localhost:8080/gameComponents',
                {
                    gameId: roundManager.gameId
                })

            const data = response.data.data;
            console.log(data)

            roundManager.setGameResources(data.rolls)
            roundManager.setCars(data.blue_car, data.green_car, data.red_car, data.yellow_car)
            roundManager.setRevenue(data.blue_revenue, data.green_revenue, data.red_revenue, data.yellow_revenue)
            console.log(roundManager);
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

                            if (valid) {
                                console.log(roundManager);
                                joinGame({ roundManager, username });
                                handleOpenWaitJoin();
                                setCheckGameStatus(true);
                            } else {
                                setErrorStatement("Invalid Code. Please try again.");
                                console.log("INVALID CODE");
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

                        for (let i = 0; i < 100; i++) {
                            const red = parseInt(Math.random() * 10 + 1);
                            const yellow = parseInt(Math.random() * 8 + 1);
                            const blue = parseInt(Math.random() * 4 + 1);
                            rolls += red + ",";
                            rolls += yellow + ",";
                            rolls += blue + ",";
                        }

                        handleCreateGame(username, blueCar, bluePenalty, greenCar, greenPenalty,
                            redCar, redPenalty, yellowCar, yellowPenalty, rolls, createCode, blueRevenue, greenRevenue,
                            redRevenue, yellowRevenue);

                        handleOpenWaitCreate();
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
                                disabled={!blueChecked}
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
                                disabled={!blueChecked}
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
                                disabled={!greenChecked}
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
                                disabled={!greenChecked}
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
                                disabled={!redChecked}
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
                                disabled={!redChecked}
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
                                disabled={!yellowChecked}
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
                                disabled={!yellowChecked}
                            />
                        </Grid>
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
                        Code: {code}
                    </DialogContentText>
                    <DialogContentText>
                        To start the game, press start. Players will be displayed here:
                        <div>
                            {/* Render your component here */}
                            <div>Elapsed Time: {elapsedTime}</div>
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
