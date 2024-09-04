import React, { useState, useEffect, useMemo } from 'react';
import {
    Grid, Card, CardContent, Typography, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import axios from 'axios';
import NumberInputModal from "./WIPPenalty.js"
import './AdminPanel.css'; // Import the CSS file for styles


export function AdminPanel({ roundManager, report }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([]); // Combined state for users, userIds, and revenues
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timePerUpdate] = useState(2);
    const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
    const [detailedUserData, setDetailedUserData] = useState([]); // State for detailed user data

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
                console.log(playerData)

                const updatedUserData = await Promise.all(
                    playerData.map(async (player) => {
                        const revResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                            gameId: roundManager.gameId,
                            userId: player.user_id
                        });
                        const revenue = revResponse.data.data[0]?.revenue || 0;
                        const roundNum = revResponse.data.data[0]?.round_number || 0;

                        console.log(revenue)
                        console.log(player.username)
                        console.log(player.user_id)

                        return {
                            userId: player.user_id,
                            username: player.username,
                            revenue: revenue,
                            round: roundNum
                        };
                    })
                );

                setUserData(updatedUserData);
                console.log(updatedUserData)
            } catch (error) {
                console.error('Error fetching players or revenue:', error);
            }
        };

        if (elapsedTime % timePerUpdate === 0) {
            fetchPlayers();
        }
    }, [elapsedTime, timePerUpdate, roundManager]);

    const endGame = async () => {
        try {
            const userResponse = await axios.post('http://localhost:8080/progressgamestatetwo', {
                gameId: roundManager.gameId
            });
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        report();
    }
    
    const handleRowClick = async (userId) => {
        setSelectedUser(userId);
        console.log(userId)
        try {
            const userResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                gameId: roundManager.gameId,
                userId: userId
            });
            setDetailedUserData(userResponse.data.data); // Expecting an array of rows from the 'round' table
            console.log(userResponse.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const formatTime = () => {
        const seconds = elapsedTime % 60;
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const hours = Math.floor(elapsedTime / 3600);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...userData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        console.log(sortableItems)
        return sortableItems;

    }, [userData, sortConfig]);
    

    const renderUserDataTable = () => {
        if (!detailedUserData || detailedUserData.length === 0) return <Typography variant="body2">No data available.</Typography>;

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
                            {detailedUserData.map((row, index) => (
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
            <div className="admin-panel-container"> {/* Wrap the Grid in a div */}
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Game Settings</Typography>
                                <Typography variant="body2">Time Since Beginning: {formatTime()}</Typography>
                                <Typography variant="body2">Current Number of Players: {userData.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Game Control</Typography>
                                <NumberInputModal endGame = {endGame} roundManager = {roundManager} time = {formatTime}/>
                                <Typography variant="h6" gutterBottom>Player Rounds</Typography>
                                {userData.map((player) => (
                                    <Typography variant="body2" key={player.userId}>
                                        {player.username}: Round: {player.round}
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
                                                active={sortConfig.key === 'username'}
                                                direction={sortConfig.direction}
                                                onClick={() => handleSort('username')}
                                            >
                                                Users
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
                                    {sortedData.map((row) => (
                                        <TableRow
                                            key={row.username}
                                            hover
                                            onClick={() => handleRowClick(row.userId)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.username}
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
                            <Card className="user-details-card">
                                <CardContent>
                                    <Typography variant="h6">User Details:</Typography>
                                    {renderUserDataTable()}
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
    );
}

export default AdminPanel;
