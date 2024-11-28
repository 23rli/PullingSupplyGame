import React, { useState, useEffect, useMemo } from 'react';
import {
    Grid, Card, CardContent, Typography,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
                const requestId = uuidv4()
                const response = await axios.post('http://3.129.12.15:8080/retrieveleaderboard', {
                    gameId: roundManager.gameId,
                    requestId: requestId
                });

                const playerData = response.data.data;


                const updatedUserData = await Promise.all(
                    playerData.map(async (player) => {
                        const requestId = uuidv4()
                        const revResponse = await axios.post('http://3.129.12.15:8080/retrieveroundinfo', {
                            gameId: roundManager.gameId,
                            userId: player.user_id,
                            requestId: requestId
                        });
                        const revenue = revResponse.data.data[0]?.revenue || 0;
                        const roundNum = revResponse.data.data[0]?.round_number || 0;


                        return {
                            userId: player.user_id,
                            username: player.username,
                            revenue: revenue,
                            round: roundNum
                        };
                    })
                );

                setUserData(updatedUserData);
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
            const requestId = uuidv4()
            const userResponse = await axios.post('http://3.129.12.15:8080/progressgamestatetwo', {
                gameId: roundManager.gameId,
                requestId: requestId
            });
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        report();
    }
    
    const handleRowClick = async (userId) => {
        setSelectedUser(userId);
        const requestId = uuidv4()
        try {
            const userResponse = await axios.post('http://3.129.12.15:8080/retrieveroundinfo', {
                gameId: roundManager.gameId,
                userId: userId,
                requestId: requestId
            });
            setDetailedUserData(userResponse.data.data); // Expecting an array of rows from the 'round' table

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
        return sortableItems;

    }, [userData, sortConfig]);
    

    const renderUserDataTable = () => {
        if (!detailedUserData || detailedUserData.length === 0) return <Typography variant="body2">No data available.</Typography>;
    
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>Round Number</TableCell>
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
                                <TableCell style={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>{row.round_number}</TableCell>
                                <TableCell align="right">{row.manu_b || row.manu_b === "0" ? row.manu_b : ''}</TableCell>
                                <TableCell align="right">{row.manu_g || row.manu_g === "0" ? row.manu_g : ''}</TableCell>
                                <TableCell align="right">{row.manu_r || row.manu_r === "0" ? row.manu_r : ''}</TableCell>
                                <TableCell align="right">{row.manu_y || row.manu_y === "0" ? row.manu_y : ''}</TableCell>
                                <TableCell align="right">{row.assem_b || row.assem_b === "0" ? row.assem_b : ''}</TableCell>
                                <TableCell align="right">{row.assem_g || row.assem_g === "0" ? row.assem_g : ''}</TableCell>
                                <TableCell align="right">{row.assem_r || row.assem_r === "0" ? row.assem_r : ''}</TableCell>
                                <TableCell align="right">{row.assem_y || row.assem_y === "0" ? row.assem_y : ''}</TableCell>
                                <TableCell align="right">{row.qual_b || row.qual_b === "0" ? row.qual_b : ''}</TableCell>
                                <TableCell align="right">{row.qual_g || row.qual_g === "0" ? row.qual_g : ''}</TableCell>
                                <TableCell align="right">{row.qual_r || row.qual_r === "0" ? row.qual_r : ''}</TableCell>
                                <TableCell align="right">{row.qual_y || row.qual_y === "0" ? row.qual_y : ''}</TableCell>
                                <TableCell align="right">{row.paint_b || row.paint_b === "0" ? row.paint_b : ''}</TableCell>
                                <TableCell align="right">{row.paint_g || row.paint_g === "0" ? row.paint_g : ''}</TableCell>
                                <TableCell align="right">{row.paint_r || row.paint_r === "0" ? row.paint_r : ''}</TableCell>
                                <TableCell align="right">{row.paint_y || row.paint_y === "0" ? row.paint_y : ''}</TableCell>
                                <TableCell align="right">{row.dry_b || row.dry_b === "0" ? row.dry_b : ''}</TableCell>
                                <TableCell align="right">{row.dry_g || row.dry_g === "0" ? row.dry_g : ''}</TableCell>
                                <TableCell align="right">{row.dry_r || row.dry_r === "0" ? row.dry_r : ''}</TableCell>
                                <TableCell align="right">{row.dry_y || row.dry_y === "0" ? row.dry_y : ''}</TableCell>
                                <TableCell align="right">{row.wip || row.wip === "0" ? row.wip : ''}</TableCell>
                                <TableCell align="right">{row.done_b || row.done_b === "0" ? row.done_b : ''}</TableCell>
                                <TableCell align="right">{row.done_g || row.done_g === "0" ? row.done_g : ''}</TableCell>
                                <TableCell align="right">{row.done_r || row.done_r === "0" ? row.done_r : ''}</TableCell>
                                <TableCell align="right">{row.done_y || row.done_y === "0" ? row.done_y : ''}</TableCell>
                                <TableCell align="right">{row.revenue || row.revenue === "0" ? row.revenue : ''}</TableCell>
                                <TableCell align="right">{row.red_res || row.red_res === "0" ? row.red_res : ''}</TableCell>
                                <TableCell align="right">{row.yel_res || row.yel_res === "0" ? row.yel_res : ''}</TableCell>
                                <TableCell align="right">{row.blue_res || row.blue_res === "0" ? row.blue_res : ''}</TableCell>
                                <TableCell align="right">{row.rcon_res || row.rcon_res === "0" ? row.rcon_res : ''}</TableCell>
                                <TableCell align="right">{row.ycon_res || row.ycon_res === "0" ? row.ycon_res : ''}</TableCell>
                                <TableCell align="right">{row.bcon_res || row.bcon_res === "0" ? row.bcon_res : ''}</TableCell>
                                <TableCell align="right">{row.unused_r || row.unused_r === "0" ? row.unused_r : ''}</TableCell>
                                <TableCell align="right">{row.unused_y || row.unused_y === "0" ? row.unused_y : ''}</TableCell>
                                <TableCell align="right">{row.unused_b || row.unused_b === "0" ? row.unused_b : ''}</TableCell>
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
                                        <TableCell align="right">
                                            <TableSortLabel
                                                active={sortConfig.key === 'round'}
                                                direction={sortConfig.direction}
                                                onClick={() => handleSort('round')}
                                            >
                                                Round
                                            </TableSortLabel>
                                        </TableCell> {/* New Sortable Column for Round */}
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
                                            <TableCell align="right">{row.round}</TableCell> {/* New Round Column */}
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
