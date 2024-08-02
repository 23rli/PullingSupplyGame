import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';

import axios from 'axios';

export function CreateGroupGame() {
    const [openIntro, setOpenIntro] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openWaitJoin, setOpenWaitJoin] = useState(false);
    const [openWaitCreate, setOpenWaitCreate] = useState(false);

    const [blueChecked, setBlueChecked] = useState(false);
    const [greenChecked, setGreenChecked] = useState(false);
    const [redChecked, setRedChecked] = useState(false);
    const [yellowChecked, setYellowChecked] = useState(false);

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
    const handleOpenWaiJoin = () => {
        setOpenJoin(false);
        setOpenWaitJoin(true);
    };

    const handleCloseWaitJoin = () => {
        setOpenWaitJoin(false);
    };

    const handleOpenWaiCreate = () => {
        setOpenCreate(false);
        setOpenWaitCreate(true);
    };

    const handleCloseWaitCreate = () => {
        setOpenWaitCreate(false);
    };



    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleOpenIntro}>
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
                open={openCreate}
                onClose={handleCloseCreate}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleCloseCreate();
                    },
                }}
            >
                <DialogTitle>Create Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adjust the Parameters to Begin
                    </DialogContentText>
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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="blueRevenue"
                        label="Blue Revenue per Car"
                        type="number"
                        variant="standard"
                        defaultValue={3.00}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!blueChecked}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="blueWIPPenalty"
                        label="Blue WIP Penalty"
                        type="number"
                        variant="standard"
                        defaultValue={1.50}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!blueChecked}
                    />

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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="greenRevenue"
                        label="Green Revenue per Car"
                        type="number"
                        variant="standard"
                        defaultValue={2.00}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!greenChecked}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="greenWIPPenalty"
                        label="Green WIP Penalty"
                        type="number"
                        variant="standard"
                        defaultValue={1.00}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!greenChecked}
                    />

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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="redRevenue"
                        label="Red Revenue per Car"
                        type="number"
                        variant="standard"
                        defaultValue={2.50}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!blueChecked}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="redWIPPenalty"
                        label="Red WIP Penalty"
                        type="number"
                        variant="standard"
                        defaultValue={1.25}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!redChecked}
                    />

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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="yellowRevenue"
                        label="Yellow Revenue per Car"
                        type="number"
                        variant="standard"
                        defaultValue={2.50}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!blueChecked}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="yellowWIPPenalty"
                        label="Yellow WIP Penalty"
                        type="number"
                        variant="standard"
                        defaultValue={1.25}
                        inputProps={{
                            step: 0.01, // Allows input of decimals
                            min: "0",   // Minimum value (optional)
                        }}
                        disabled={!yellowChecked}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreate}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openJoin}
                onClose={handleCloseJoin}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const code = formJson.code;
                        //axios.post
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To join a game, input the 6 digit code provided by your game creator
                    </DialogContentText>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseJoin}>Cancel</Button>
                    <Button type="submit">Join</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openWaitCreate}
                onClose={handleCloseWaitCreate}

            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openWaitJoin}
                onClose={handleCloseWaitJoin}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
