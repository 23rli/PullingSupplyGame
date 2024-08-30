import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios'

export function NumberInputModal({endGame, roundManager, time}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [errorStatement, setErrorStatement] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        console.log('Submitted Value:', inputValue);
        // Add further processing of the input value here
        handleClose();
    };

    const handleCancel = () => {
        setInputValue(''); // Reset input value if canceled
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                End Game
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());

                        const penalty = formJson.WIPPen;
                        const roundNum = formJson.roundNum;

                        roundManager.WIPPen = penalty;
                        roundManager.WIPRound = roundNum;
                        roundManager.time = time;
                        endGame();
                    },
                }}
            >
                <DialogTitle>End Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select the round and Work in Progress Penalty for this game!
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="roundNum"
                        name="roundNum"
                        label="Round Number to Calculate WIP Penalty"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="WIPPen"
                        name="WIPPen"
                        label="WIP Penalty per Car"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={1.50}
                        inputProps={{
                            step: 0.01,
                            min: 0,
                        }}
                    />
                    <DialogContentText style={{ color: 'red', margin: '16px 0' }}>
                        {errorStatement !== '' && errorStatement}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">End Game</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NumberInputModal;
