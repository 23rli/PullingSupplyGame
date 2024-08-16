import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function AdminPanel() {
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEndGameDialog, setOpenEndGameDialog] = useState(false);

    // Example data
    const gameSettings = {
        timeSinceStart: '15:30',
        playerCount: 8,
    };
    const playerRounds = [
        { userId: 'User1', latestRound: 5 },
        { userId: 'User2', latestRound: 3 },
        // more data here
    ];
    const playerRevenues = [
        { userId: 'User1', revenue: 1200 },
        { userId: 'User2', revenue: 950 },
        // more data here
    ];

    const handleRowClick = (userId) => {
        setSelectedUser(userId);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedUser(null);
    };

    const handleEndGame = () => {
        setOpenEndGameDialog(true);
    };

    const handleCloseEndGameDialog = () => {
        setOpenEndGameDialog(false);
    };

    return (
        <Grid container spacing={2} padding={2}>
            {/* Top Left Dialog: Game Settings */}
            <Grid item xs={6}>
                <Dialog open={true} fullWidth>
                    <DialogTitle>Game Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Time Since Beginning: {gameSettings.timeSinceStart}
                        </DialogContentText>
                        <DialogContentText>
                            Current Number of Players: {gameSettings.playerCount}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Grid>

            {/* Top Right Dialog: End Game and Latest Round Info */}
            <Grid item xs={6}>
                <Dialog open={true} fullWidth>
                    <DialogTitle>Game Control</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Button variant="contained" color="secondary" onClick={handleEndGame}>
                                End Game
                            </Button>
                        </DialogContentText>
                        <Typography variant="h6" gutterBottom>Player Rounds</Typography>
                        {playerRounds.map((player) => (
                            <DialogContentText key={player.userId}>
                                {player.userId}: Round {player.latestRound}
                            </DialogContentText>
                        ))}
                    </DialogContent>
                </Dialog>
            </Grid>

            {/* Bottom: Revenue Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playerRevenues.map((row) => (
                                <TableRow
                                    key={row.userId}
                                    hover
                                    onClick={() => handleRowClick(row.userId)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.userId}
                                    </TableCell>
                                    <TableCell align="right">{row.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Details Dialog (opens on row click) */}
            <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth>
                <DialogTitle>User Details: {selectedUser}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Detailed information about {selectedUser} goes here...
                    </DialogContentText>
                    {/* Add additional content like another table or graphs here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* End Game Dialog */}
            <Dialog open={openEndGameDialog} onClose={handleCloseEndGameDialog} fullWidth>
                <DialogTitle>End Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to end the game? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEndGameDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { /* handle ending game logic */ }} color="secondary">
                        End Game
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default AdminPanel;
