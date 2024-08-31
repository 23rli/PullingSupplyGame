//Use WIP penalty from beginning of game to calculate
//add revenue in final report to after WIP
//Add columns to Final Rev: Max WIP per team, total throughput (how many cars pushed through), total wip penalty per team
//Reference Screenshot
//Fix both final report and admin panel tables

//fix round disply in deatiled user info

// swtich user overview with game stats in excel file

//look at screen 


//Hide endgame button for team game players

import React, { useState, useEffect } from 'react';
import {
    Grid, Card, Box, CardContent, Typography, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Make sure to install xlsx library

import NumberInputModal from "./WIPPenalty.js"
import './FinalReport.css'; // Import the CSS file for styles

export function FinalReport({ roundManager, wipPenalty, wipRound, time}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([]); // Combined state for users, userIds, and revenues
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timePerUpdate] = useState(2);
    const [sortConfig, setSortConfig] = useState({ key: 'userId', direction: 'asc' });
    const [detailedUserData, setDetailedUserData] = useState([]); // State for detailed user data
    const [gameStats, setGameStats] = useState(null);

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

                const updatedUserData = await Promise.all(
                    playerData.map(async (player) => {
                        const revResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                            gameId: roundManager.gameId,
                            userId: player.user_id
                        });
                        const revenue = revResponse.data.data[0]?.revenue || 0;
                        const finalRoundNum = revResponse.data.data[0]?.round_number || 0;
                        let carNum = 0;
                        for(let i = 0; i < revResponse.data.data.length; i++){
                            if(revResponse.data.data[i].round_number == wipRound){
                                carNum = revResponse.data.data[i].wip;
                            }
                        }

                        return {
                            userId: player.user_id,
                            username: player.username,
                            revenue: revenue,
                            round: finalRoundNum,
                            revenueAfterWIP: revenue - (wipPenalty * carNum),
                            WIPPen: (wipPenalty * carNum)
                        };
                    })
                );

                setUserData(updatedUserData);
                setGameStats(revenueData)
            } catch (error) {
                console.error('Error fetching players or revenue:', error);
            }
        };

        if (elapsedTime % timePerUpdate === 0) {
            fetchPlayers();
        }
    }, [elapsedTime, timePerUpdate, roundManager]);

    const revenueData = () => {
        let totalRevNP = 0;
        let totalRevYP = 0;
        let totalWIPPen = 0;
        let totalRound = 0;
    
        let revenueNPArray = [];
        let revenueYPArray = [];
        let WIPPenArray = [];
        let roundArray = [];
    
        for (let i = 0; i < userData.length; i++) {
            totalRevNP += userData[i].revenue;
            totalRevYP += userData[i].revenueAfterWIP;
            totalWIPPen += userData[i].WIPPen;
            totalRound += userData[i].round;
    
            revenueNPArray.push(userData[i].revenue);
            revenueYPArray.push(userData[i].revenueAfterWIP);
            WIPPenArray.push(userData[i].WIPPen);
            roundArray.push(userData[i].round);
        }
    
        // Sort arrays from least to greatest
        revenueNPArray.sort((a, b) => a - b);
        revenueYPArray.sort((a, b) => a - b);
        WIPPenArray.sort((a, b) => a - b);
        roundArray.sort((a, b) => a - b);
    
        return {
            lowRevNP: revenueNPArray[0],
            highRevNP: revenueNPArray[revenueNPArray.length - 1],
            medRevNP: revenueNPArray.length % 2 === 0 ?
                (revenueNPArray[revenueNPArray.length / 2] + revenueNPArray[revenueNPArray.length / 2 - 1]) / 2 :
                revenueNPArray[Math.floor(revenueNPArray.length / 2)],
            meanRevNP: totalRevNP / revenueNPArray.length,
    
            lowRevYP: revenueYPArray[0],
            highRevYP: revenueYPArray[revenueYPArray.length - 1],
            medRevYP: revenueYPArray.length % 2 === 0 ?
                (revenueYPArray[revenueYPArray.length / 2] + revenueYPArray[revenueYPArray.length / 2 - 1]) / 2 :
                revenueYPArray[Math.floor(revenueYPArray.length / 2)],
            meanRevYP: totalRevYP / revenueYPArray.length,
    
            lowWIPPen: WIPPenArray[0],
            highWIPPen: WIPPenArray[WIPPenArray.length - 1],
            medWIPPen: WIPPenArray.length % 2 === 0 ?
                (WIPPenArray[WIPPenArray.length / 2] + WIPPenArray[WIPPenArray.length / 2 - 1]) / 2 :
                WIPPenArray[Math.floor(WIPPenArray.length / 2)],
            meanWIPPen: totalWIPPen / WIPPenArray.length,
    
            lowRound: roundArray[0],
            highRound: roundArray[roundArray.length - 1],
            medRound: roundArray.length % 2 === 0 ?
                (roundArray[roundArray.length / 2] + roundArray[roundArray.length / 2 - 1]) / 2 :
                roundArray[Math.floor(roundArray.length / 2)],
            meanRound: totalRound / roundArray.length
        };
    };
    
    const handleRowClick = async (userId) => {
        setSelectedUser(userId);
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

    const exportToExcel = async () => {
        const workbook = XLSX.utils.book_new();

        try{
            const gameData = await axios.post('http://localhost:8080/retrievegamedetails', {
                gameId: roundManager.gameId,
            });
            
            // Flatten the data for Excel export
            const gameTable = gameData.data.data.map(row => ({
                'Game ID': row.game_id,
                'Game Created': row.game_created,
                'Rolls': row.rolls ? row.rolls.split(',').join(', ') : '',
                'Blue Car': row.blue_car,
                'Green Car': row.green_car,
                'Red Car': row.red_car,
                'Yellow Car': row.yellow_car,
                'Blue Penalty': row.blue_penalty,
                'Green Penalty': row.green_penalty,
                'Red Penalty': row.red_penalty,
                'Yellow Penalty': row.yellow_penalty,
                'Mode': row.mode,
                'Code': row.code,
                'Blue Revenue': row.blue_revenue,
                'Green Revenue': row.green_revenue,
                'Red Revenue': row.red_revenue,
                'Yellow Revenue': row.yellow_revenue,
                'Game State': row.game_state,
                'Game Notes': row.game_notes 
            }));
            
            const gameStatsXcel = XLSX.utils.json_to_sheet(gameTable);
            XLSX.utils.book_append_sheet(workbook, gameStatsXcel, "Game Details");
            
        } catch (error) {
                console.error(`Error fetching data `, error);
        }
       
        const data = [
            {
                Statistic: "Lowest",
                RevenueWithoutWIPPenalty: gameStats.lowRevNP,
                RevenueWithWIPPenalty: gameStats.lowRevYP,
                RoundNumber: gameStats.lowRound,
                WIPPenalty: gameStats.lowWIPPen
            },
            {
                Statistic: "Highest",
                RevenueWithoutWIPPenalty: gameStats.highRevNP,
                RevenueWithWIPPenalty: gameStats.highRevYP,
                RoundNumber: gameStats.highRound,
                WIPPenalty: gameStats.highWIPPen
            },
            {
                Statistic: "Median",
                RevenueWithoutWIPPenalty: gameStats.medRevNP,
                RevenueWithWIPPenalty: gameStats.medRevYP,
                RoundNumber: gameStats.medRound,
                WIPPenalty: gameStats.medWIPPen
            },
            {
                Statistic: "Mean",
                RevenueWithoutWIPPenalty: gameStats.meanRevNP,
                RevenueWithWIPPenalty: gameStats.meanRevYP,
                RoundNumber: gameStats.meanRound,
                WIPPenalty: gameStats.meanWIPPen
            }
        ];
    
        const statsWorksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, statsWorksheet, "Game Stats");
    
        // Add User Revenue data to a new sheet
        const userRevenueData = userData.map(user => ({
            Username: user.username,
            Revenue: user.revenue,
            RevenueAfterWIP: user.revenueAfterWIP,
            Round: user.round,
            WIPPenalty: user.WIPPen
        }));
        const userRevenueWorksheet = XLSX.utils.json_to_sheet(userRevenueData);
        XLSX.utils.book_append_sheet(workbook, userRevenueWorksheet, "User Overview");
    
        // Add detailed user data sheets
        for (const user of userData) {
            try {
                const detailedUserResponse = await axios.post('http://localhost:8080/retrieveroundinfo', {
                    gameId: roundManager.gameId,
                    userId: user.userId
                });
                const detailedUserData = detailedUserResponse.data.data.map(row => ({
                    RoundNumber: row.round_number,
                    ManuB: row.manu_b,
                    ManuG: row.manu_g,
                    ManuR: row.manu_r,
                    ManuY: row.manu_y,
                    AssemB: row.assem_b,
                    AssemG: row.assem_g,
                    AssemR: row.assem_r,
                    AssemY: row.assem_y,
                    QualB: row.qual_b,
                    QualG: row.qual_g,
                    QualR: row.qual_r,
                    QualY: row.qual_y,
                    PaintB: row.paint_b,
                    PaintG: row.paint_g,
                    PaintR: row.paint_r,
                    PaintY: row.paint_y,
                    DryB: row.dry_b,
                    DryG: row.dry_g,
                    DryR: row.dry_r,
                    DryY: row.dry_y,
                    WIP: row.wip,
                    DoneB: row.done_b,
                    DoneG: row.done_g,
                    DoneR: row.done_r,
                    DoneY: row.done_y,
                    Revenue: row.revenue,
                    RedRes: row.red_res,
                    YelRes: row.yel_res,
                    BlueRes: row.blue_res,
                    RconRes: row.rcon_res,
                    YconRes: row.ycon_res,
                    BconRes: row.bcon_res,
                    UnusedR: row.unused_r,
                    UnusedY: row.unused_y,
                    UnusedB: row.unused_b,
                }));
    
                const detailedUserWorksheet = XLSX.utils.json_to_sheet(detailedUserData);
                XLSX.utils.book_append_sheet(workbook, detailedUserWorksheet, user.username);
            } catch (error) {
                console.error(`Error fetching data for user ${user.username}:`, error);
            }
        }
    
        // Finalize and save the Excel file
        XLSX.writeFile(workbook, "Game_Stats.xlsx");
    };
    


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
        <div className="final-report-container">
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Game Overview</Typography>
                            <Button variant="contained" color="primary" onClick={exportToExcel}>
                                Export to Excel
                            </Button>
                        </Box>
                            <Typography variant="body2"> Game Time Elasped: {roundManager.time}</Typography>
                            <Typography variant="body2">Number of Players: {userData.length}</Typography>
                            <Typography variant="body2">WIP Penalty: {wipPenalty}</Typography>
                            <Typography variant="body2">Penalty Enacted in Round: {wipRound}</Typography>
                            {gameStats && ( 
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Statistic</TableCell>
                                                <TableCell align="right">Revenue Without WIP Penalty</TableCell>
                                                <TableCell align="right">Revenue With WIP Penalty</TableCell>
                                                <TableCell align="right">Round Number</TableCell>
                                                <TableCell align="right">WIP Penalty</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Lowest</TableCell>
                                                <TableCell align="right">{gameStats.lowRevNP}</TableCell>
                                                <TableCell align="right">{gameStats.lowRevYP}</TableCell>
                                                <TableCell align="right">{gameStats.lowRound}</TableCell>
                                                <TableCell align="right">{gameStats.lowWIPPen}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Highest</TableCell>
                                                <TableCell align="right">{gameStats.highRevNP}</TableCell>
                                                <TableCell align="right">{gameStats.highRevYP}</TableCell>
                                                <TableCell align="right">{gameStats.highRound}</TableCell>
                                                <TableCell align="right">{gameStats.highWIPPen}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Median</TableCell>
                                                <TableCell align="right">{gameStats.medRevNP}</TableCell>
                                                <TableCell align="right">{gameStats.medRevYP}</TableCell>
                                                <TableCell align="right">{gameStats.medRound}</TableCell>
                                                <TableCell align="right">{gameStats.medWIPPen}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Mean</TableCell>
                                                <TableCell align="right">{gameStats.meanRevNP}</TableCell>
                                                <TableCell align="right">{gameStats.meanRevYP}</TableCell>
                                                <TableCell align="right">{gameStats.meanRound}</TableCell>
                                                <TableCell align="right">{gameStats.meanWIPPen}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
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
                                            active={sortConfig.key === 'Users'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort('Users')}
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
                                {userData.map((row) => (
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
                        <Card>
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

export default FinalReport;
