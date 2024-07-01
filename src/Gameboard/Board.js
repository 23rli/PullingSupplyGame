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
import { Engineering, Build, MiscellaneousServices, Add as AddIcon } from '@mui/icons-material';
import  AlertDialogSlide  from '../Modals/TransitionScreen/NextRound.js';
import { DraggableDialog } from '../Modals/Converter/Window.js';
import { ColumnGrid } from './ColumnGrid.js';
import { ColumnHeader } from './ColumnHeader.js';
import { Piece } from '../Pieces/Piece.js';
import { ItemTypes } from '../Pieces/ItemTypes.js';
import StatisticsModal from '../Modals/Statistics/StatusModal.js';

// Styles
const boardStyle = {
  width: '90vw',       // 90% of viewport width
  height: '150vh',      // 90% of viewport height
  display: 'flex',     // Flexbox layout
  flexWrap: 'wrap',    // Wrap children to the next line
  boxSizing: 'border-box',  // Include padding and border in the element's total width and height
};
const columnStyle = { width: '16.666%', height: '11%' }
const columnHeaderStyle = { width: '16.666%', height: '7%' }
const appBarStyle = { width: '100%', height: '5%' }
const fabStyle = { position: 'fixed', bottom: 16, right: 16 }; // Positioning the FAB

export const Board = ({ roundManager }) => {

  const [cars, setCars] = useState(roundManager.cars);
  const [round, setRound] = useState(roundManager);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    roundManager.observe(({ updateCars}) => {
      setCars([...updateCars]);
    });
  }, [roundManager]);


  function renderColumnHeader(i) {
    const x = i;
    const y = 0;
    return (
      <div key={i} style={columnHeaderStyle}>
        <ColumnHeader x={x} y={y} roundManager = {roundManager}></ColumnHeader>
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
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Motor City
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1  }}>
                Round: {roundManager.roundNum}
              </Typography>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  sx = {{color: red[300] }}
                >
                  <Badge badgeContent={roundManager.roundResources[0]} color="">
                    <Build sx={{ color: red[300] }} />
                  </Badge>
                </IconButton>
                <p>Red</p>
              </MenuItem>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={roundManager.roundResources[1]} color="">
                    <MiscellaneousServices sx={{ color: yellow[300] }} />
                  </Badge>
                </IconButton>
                <p>Yellow</p>
              </MenuItem>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={roundManager.roundResources[2]} color="">
                    <Engineering sx={{ color: blue[300] }} />
                  </Badge>
                </IconButton>
                <p>Blue</p>
              </MenuItem>
              <Divider orientation="vertical" flexItem component="div" role="presentation" sx={{ ml: 2 }} />
              <DraggableDialog roundManager={roundManager} />
              <Button color="inherit" onClick={handleAllocate} sx={{ ml: 1 }}> Allocate </Button>
              <StatisticsModal roundManager = {roundManager}/>
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

    if(id != -1){
      if(id.charAt(0) === 'b'){
        type = ItemTypes.BCAR;
      }else if(id.charAt(0) === 'g'){
        type = ItemTypes.GCAR
      }
    }
    
    return (
      <div key={i} style={columnStyle}>
        <ColumnGrid x={x} y={y} roundManager = {roundManager}>
          <Piece type={type} id={id} roundManager={roundManager} />
        </ColumnGrid>
      </div>
    );
  }

  // Array to hold all the squares of the board
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
      <AlertDialogSlide roundManager = {roundManager}/>
    </div>
  );
}
