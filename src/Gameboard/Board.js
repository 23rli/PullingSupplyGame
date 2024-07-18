import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { blue, yellow, grey, red } from '@mui/material/colors';
import { Engineering, Build, MiscellaneousServices } from '@mui/icons-material';
import AlertDialogSlide from '../Modals/TransitionScreen/NextRound.js';
import { DraggableDialog } from '../Modals/Converter/Window.js';
import { ColumnGrid } from './ColumnGrid.js';
import { ColumnHeader } from './ColumnHeader.js';
import { Piece } from '../Pieces/Piece.js';
import { ItemTypes } from '../Pieces/ItemTypes.js';
import StatisticsModal from '../Modals/Statistics/StatusModal.js';

// Styles
const boardStyle = {
  width: '90vw',
  height: '150vh',
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
};
const columnStyle = { width: '16.666%', height: '11%' };
const columnHeaderStyle = { width: '16.666%', height: '7%' };
const appBarStyle = { width: '100%', height: '7%' };
const fabStyle = { position: 'fixed', bottom: 16, right: 16 };

export const Board = ({ roundManager, longMemory, onEnd }) => {
  const [cars, setCars] = useState(roundManager.cars);
  const [draggedItem, setDraggedItem] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const endGame = () => {
    onEnd();
  };

  const checkGameOver = () => {
    if (roundManager.endGame) {
      endGame();
    }
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  useEffect(() => {
    roundManager.observe(({ updateCars }) => {
      setCars([...updateCars]);
    });
  }, [roundManager]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (elapsedTime === 120) {
      // Stop the converter after 2 minutes
      roundManager.stopConverter();
    }
    if (elapsedTime === 180) {
      // Automatically move to the next round after 3 minutes
      roundManager.nextRound();
      setElapsedTime(0); // Reset timer for the next round
    }
  }, [elapsedTime, roundManager]);

  function renderColumnHeader(i) {
    const x = i;
    const y = 0;
    return (
      <div key={i} style={columnHeaderStyle}>
        <ColumnHeader x={x} y={y} roundManager={roundManager} />
      </div>
    );
  }

  function handleAllocate() {
    roundManager.allocateResources();
    roundManager.emitChange();
  }

  function renderAppBar(i) {
    return (
      <div key={i} style={appBarStyle}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: grey[800] }}>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Motor City
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Round: {roundManager.roundNum}
              </Typography>
              <MenuItem sx={{ bgcolor: red[400], display: 'flex', alignItems: 'left', justifyContent: 'center' }}>
                <IconButton size="large" aria-label="show 17 new notifications">
                  <Badge color="">
                    <Build sx={{ color: red[100] }} />
                  </Badge>
                </IconButton>
                <p>Red: {roundManager.roundResources[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </MenuItem>
              <MenuItem sx={{ bgcolor: "#c9bd32", color: grey[100] }}>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                  <Badge color="">
                    <MiscellaneousServices sx={{ color: yellow[100] }} />
                  </Badge>
                </IconButton>
                <p>Yellow: {roundManager.roundResources[1]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </MenuItem>
              <MenuItem sx={{ bgcolor: blue[500] }}>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                  <Badge color="">
                    <Engineering sx={{ color: blue[100] }} />
                  </Badge>
                </IconButton>
                <p>Blue: {roundManager.roundResources[2]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </MenuItem>
              <Divider orientation="vertical" flexItem component="div" role="presentation" sx={{ ml: 2 }} />
              <DraggableDialog roundManager={roundManager} longMemory={longMemory} sx={{ ml: 1 }} />
              <Button color="inherit" variant='outlined' onClick={handleAllocate} sx={{ ml: 1 }}>Allocate</Button>
              <StatisticsModal roundManager={roundManager} longMemory={longMemory} />
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }

  function renderColumnSpace(i) {
    const x = i % 6;
    const y = Math.floor(i / 6);

    let type = '';
    let id = roundManager.findId(x, y, cars);

    if (id !== -1 && typeof id === 'string') {
      if (id.charAt(0) === 'b') {
        type = ItemTypes.BCAR;
      } else if (id.charAt(0) === 'g') {
        type = ItemTypes.GCAR;
      }
    }

    return (
      <div key={i} style={columnStyle}>
        <ColumnGrid x={x} y={y} roundManager={roundManager}>
          {id !== -1 && (
            <Piece
              type={type}
              id={id}
              roundManager={roundManager}
            />
          )}
        </ColumnGrid>
      </div>
    );
  }

  const squares = [];

  squares.push(renderAppBar(-8));
  for (let i = -6; i < 0; i += 1) {
    squares.push(renderColumnHeader(i));
  }
  for (let i = 0; i < 48; i += 1) {
    squares.push(renderColumnSpace(i));
  }

  return (
    <div style={boardStyle}>
      {squares}
      <AlertDialogSlide roundManager={roundManager} longMemory={longMemory} />
    </div>
  );
};
