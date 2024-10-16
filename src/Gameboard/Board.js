import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as Mui from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu.js';
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
import { RecipeScreen } from '../Modals/Recipes/RecipeScreen.js';

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

export const Board = ({ roundManager, longMemory, endGame }) => {
  const [cars, setCars] = useState(roundManager.cars);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timePerRound, setTimePerRound] = useState(600);
  const [activeConverter, setActiveConverter] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(false);


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
    if (roundManager.roundNum >= 6 && roundManager.roundNum <= 10) {
      setTimePerRound(180);
    } else if (roundManager.roundNum >= 11) {
      setTimePerRound(120);
    }

    if (elapsedTime === (timePerRound / 3) * 2) {
      setActiveConverter(false);
    }

    if (elapsedTime >= timePerRound) {
      setAutoAdvance(true);
    }
  }, [elapsedTime, roundManager, timePerRound]);


  const resetTimer = useCallback(() => {
    setElapsedTime(0);
    setAutoAdvance(false);
    setActiveConverter(true);
  }, []);

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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Round: {roundManager.roundNum}
              </Typography>
              <RecipeScreen sx={{ ml: 1, display: 'flex'}}/>
              <MenuItem sx={{ bgcolor: red[400], display: 'flex', alignItems: 'left', justifyContent: 'center',  ml: 1 }}>
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
              <Divider
                orientation="vertical"
                flexItem
                component="div"
                role="presentation"
                sx={{
                  ml: 5,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent', // Make border transparent if there is any
                  boxShadow: 'none' // Remove any box shadow
                }}
              />
              {activeConverter && (
                <DraggableDialog roundManager={roundManager} longMemory={longMemory} sx={{ ml: 1 }} />
              )}
              {!activeConverter && (
                <Button disabled>Converter</Button>
              )}
              <Button color="inherit" variant='outlined' onClick={handleAllocate} sx={{ ml: 1 }}>Allocate</Button>
              <StatisticsModal roundManager={roundManager} longMemory={longMemory} sx={{ ml: 2 }} />
              <Divider
                orientation="vertical"
                flexItem
                component="div"
                role="presentation"
                sx={{
                  ml: 5,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent', // Make border transparent if there is any
                  boxShadow: 'none' // Remove any box shadow
                }}
              />
              <Typography variant="h6" component="div">
                {elapsedTime <= timePerRound && (timePerRound - elapsedTime)%60 < 10 && (timePerRound - elapsedTime)%60 > 0  && (
                  <>
                    Timer: {Math.floor((timePerRound - elapsedTime) / 60) + ":0" + ((timePerRound - elapsedTime) % 60)}
                  </>
                )}
                {elapsedTime <= timePerRound && (timePerRound - elapsedTime)%60 >= 10 && (
                  <>
                    Timer: {Math.floor((timePerRound - elapsedTime) / 60) + ":" + ((timePerRound - elapsedTime) % 60)}
                  </>
                )}
                {elapsedTime <= timePerRound && elapsedTime / 60 > 0 && elapsedTime % 60 === 0 && (
                  <>
                    Timer: {Math.floor((timePerRound - elapsedTime) / 60) + ":00"}
                  </>
                )}
                {elapsedTime > timePerRound && (
                  <>
                    Timer: 0:00
                  </>
                )}
              </Typography>
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
      } else if (id.charAt(0) === 'r') {
        type = ItemTypes.RCAR;
      } else if (id.charAt(0) === 'y') {
        type = ItemTypes.YCAR;
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
      <AlertDialogSlide roundManager={roundManager} longMemory={longMemory} endGame={endGame} autoAdvance={autoAdvance} resetTimer={resetTimer} />
    </div>
  );
};
