import React, { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, Typography, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import axios from 'axios';

export function AdminPanel({ roundManager }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [userRev, setUserRev] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timePerUpdate] = useState(2);
    const [sortConfig, setSortConfig] = useState({ key: 'userId', direction: 'asc' });
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.post('http://localhost:8080/retrieveleaderboard', {
                    gameId: roundManager.gameId
                });

                const playerData = response.data.data;
                const usernames = playerData.map(player => player.username);
                const revenues = await Promise.all(
                    playerData.map(async (player) => {
                        const revResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                            gameId: roundManager.gameId,
                            userId: player.user_id
                        });
                        return revResponse.data.data[0].revenue;
                    })
                );

                setUsers(usernames);
                setUserRev(revenues);
            } catch (error) {
                console.error('Error fetching players or revenue:', error);
            }
        };

        if (elapsedTime % timePerUpdate === 0) {
            fetchPlayers();
        }
    }, [elapsedTime, timePerUpdate, roundManager]);

    const handleRowClick = async (username) => {
        setSelectedUser(username);
        try {
            const userResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                gameId: roundManager.gameId,
                userId: username
            });
            setUserData(userResponse.data); // Expecting an array of rows from the 'round' table
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderUserDataTable = () => {
        if (!userData || userData.length === 0) return <Typography variant="body2">No data available.</Typography>;

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Round Number</TableCell>
                            <TableCell align="right">Manu B</TableCell>
                            <TableCell align="right">Manu G</TableCell>
                            <TableCell align="right">Manu R</TableCell>
                            <TableCell align="right">Manu Y</TableCell>
                            <TableCell align="right">Assem B</TableCell>
                            <TableCell align="right">Assem G</TableCell>
                            <TableCell align="right">Assem R</TableCell>
                            <TableCell align="right">Assem Y</TableCell>
                            <TableCell align="right">Qual B</TableCell>
                            <TableCell align="right">Qual G</TableCell>
                            <TableCell align="right">Qual R</TableCell>
                            <TableCell align="right">Qual Y</TableCell>
                            <TableCell align="right">Paint B</TableCell>
                            <TableCell align="right">Paint G</TableCell>
                            <TableCell align="right">Paint R</TableCell>
                            <TableCell align="right">Paint Y</TableCell>
                            <TableCell align="right">Dry B</TableCell>
                            <TableCell align="right">Dry G</TableCell>
                            <TableCell align="right">Dry R</TableCell>
                            <TableCell align="right">Dry Y</TableCell>
                            <TableCell align="right">WIP</TableCell>
                            <TableCell align="right">Done B</TableCell>
                            <TableCell align="right">Done G</TableCell>
                            <TableCell align="right">Done R</TableCell>
                            <TableCell align="right">Done Y</TableCell>
                            <TableCell align="right">Revenue</TableCell>
                            <TableCell align="right">Red Res</TableCell>
                            <TableCell align="right">Yel Res</TableCell>
                            <TableCell align="right">Blue Res</TableCell>
                            <TableCell align="right">Rcon Res</TableCell>
                            <TableCell align="right">Ycon Res</TableCell>
                            <TableCell align="right">Bcon Res</TableCell>
                            <TableCell align="right">Unused R</TableCell>
                            <TableCell align="right">Unused Y</TableCell>
                            <TableCell align="right">Unused B</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.round_number}</TableCell>
                                <TableCell align="right">{row.manu_b}</TableCell>
                                <TableCell align="right">{row.manu_g}</TableCell>
                                <TableCell align="right">{row.manu_r}</TableCell>
                                <TableCell align="right">{row.manu_y}</TableCell>
                                <TableCell align="right">{row.assem_b}</TableCell>
                                <TableCell align="right">{row.assem_g}</TableCell>
                                <TableCell align="right">{row.assem_r}</TableCell>
                                <TableCell align="right">{row.assem_y}</TableCell>
                                <TableCell align="right">{row.qual_b}</TableCell>
                                <TableCell align="right">{row.qual_g}</TableCell>
                                <TableCell align="right">{row.qual_r}</TableCell>
                                <TableCell align="right">{row.qual_y}</TableCell>
                                <TableCell align="right">{row.paint_b}</TableCell>
                                <TableCell align="right">{row.paint_g}</TableCell>
                                <TableCell align="right">{row.paint_r}</TableCell>
                                <TableCell align="right">{row.paint_y}</TableCell>
                                <TableCell align="right">{row.dry_b}</TableCell>
                                <TableCell align="right">{row.dry_g}</TableCell>
                                <TableCell align="right">{row.dry_r}</TableCell>
                                <TableCell align="right">{row.dry_y}</TableCell>
                                <TableCell align="right">{row.wip}</TableCell>
                                <TableCell align="right">{row.done_b}</TableCell>
                                <TableCell align="right">{row.done_g}</TableCell>
                                <TableCell align="right">{row.done_r}</TableCell>
                                <TableCell align="right">{row.done_y}</TableCell>
                                <TableCell align="right">{row.revenue}</TableCell>
                                <TableCell align="right">{row.red_res}</TableCell>
                                <TableCell align="right">{row.yel_res}</TableCell>
                                <TableCell align="right">{row.blue_res}</TableCell>
                                <TableCell align="right">{row.rcon_res}</TableCell>
                                <TableCell align="right">{row.ycon_res}</TableCell>
                                <TableCell align="right">{row.bcon_res}</TableCell>
                                <TableCell align="right">{row.unused_r}</TableCell>
                                <TableCell align="right">{row.unused_y}</TableCell>
                                <TableCell align="right">{row.unused_b}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Grid container spacing={2} padding={2}>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Game Settings</Typography>
                        <Typography variant="body2">Time Since Beginning: {formatTime()}</Typography>
                        <Typography variant="body2">Current Number of Players: {users.length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Game Control</Typography>
                        <Button variant="contained" color="secondary" onClick={() => alert('End Game')}>
                            End Game
                        </Button>
                        <Typography variant="h6" gutterBottom>Player Rounds</Typography>
                        {playerRevenues().map((player, index) => (
                            <Typography variant="body2" key={player.userId}>
                                {player.userId}: Round {userRev[index] || 0}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortConfig.key === 'userId'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('userId')}
                                    >
                                        User ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={sortConfig.key === 'revenue'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('revenue')}
                                    >
                                        Revenue
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playerRevenues().map((row) => (
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

            {selectedUser && (
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">User Details: {selectedUser}</Typography>
                            {renderUserDataTable()}
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}

export default AdminPanel;
