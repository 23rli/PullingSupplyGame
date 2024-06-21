// Importing necessary hooks from React
import { useEffect, useState } from 'react'
import * as Mui from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';



import { DraggableDialog } from '../Converter/Window.js'
// Importing the BoardSquare component from the same directory
import { ColumnGrid } from './ColumnGrid.js'

import { ColumnHeader } from './ColumnHeader.js'

import {Header} from './Header.js'

// Importing the Piece component from the same directory
import { Piece } from '../Pieces/Piece.js'
import { ItemTypes } from '../Pieces/ItemTypes.js'


const theme = createTheme();

theme.spacing(2); // `${8 * 2}px` = '16px'

// Styling properties applied to the board element
// Styles for the board
const boardStyle = {
  width: '90vw',       // 90% of viewport width
  height: '150vh',      // 90% of viewport height
  display: 'flex',     // Flexbox layout
  flexWrap: 'wrap',    // Wrap children to the next line
  boxSizing: 'border-box',  // Include padding and border in the element's total width and height
};

// Styling properties applied to each square element
const columnStyle = { width: '16.666%', height: '11%' }
const columnHeaderStyle = { width: '16.666%', height: '7%' }
const headerStyle = { width: '100%', height: '10%'}
const appBarStyle = {width: '100%', height: '5%'}


/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({game, carManager, roundManager}) => {
  const [[knightX, knightY], setKnightPos] = useState(game.knightPosition)
  const [blueCars, setBlueCars] = useState(carManager.blueCars);
  const [greenCars, setGreenCars] = useState(carManager.greenCars);
  const [time, setTime] = useState(new Date());



   // useEffect to set up an observer for the game state
   useEffect(() => {
    //const interval = setInterval(() => {
   //   setTime(new Date());
    //}, 1000)

    game.observe(setKnightPos);
    carManager.observe(({ updateBlueCars, updateGreenCars }) => {
      setBlueCars([...updateBlueCars]);
     setGreenCars([...updateGreenCars]);
    });

    //return () => clearInterval(interval);
  }, [game, carManager]); 
 
    // Function to render a single square on the board
  function renderHeader(i) {
    return (
      <div key={i} style={headerStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <Header>
          
        </Header>
      </div>
    )
  }

  // Function to render a single square on the board
  function renderColumnHeader(i) {
    const x = i            // Calculate x-coordinate (column) of the square
    const y = 0 // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={columnHeaderStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <ColumnHeader x={x} y={y}>

        </ColumnHeader>
      </div>
    )
  }
  function handleAllocate(){

  }


  function renderAppBar(i){
      return(
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
              <DraggableDialog/>
              <Divider orientation="vertical" flexItem component="div" role="presentation"/>
              <Button color = "inherit" onClick = {handleAllocate}> Allocate </Button>
            </Toolbar>
          </AppBar>
        </Box>
    </div>
    );
  }

  function renderColumnSpace(i) {
    const x = i % 6;              // Calculate x-coordinate (column) of the square
    const y = Math.floor(i / 6);  // Calculate y-coordinate (row) of the square
    const isKnight = x === knightX && y === knightY;

    let type = '';
    let id = -1;
    
    if(x === knightX && y === knightY){
      type = ItemTypes.KNIGHT
    }else if(carManager.hasBlueCar(x,y,blueCars)){
      type = ItemTypes.BCAR
      id = carManager.findBlueId(x,y, blueCars);
    }else if(carManager.hasGreenCar(x,y,greenCars)){
      type = ItemTypes.GCAR
      id = carManager.findGreenId(x,y, greenCars);
    }

    

    return (
      <div key={i} style={columnStyle}>
        <ColumnGrid x={x} y={y} game={game} carManager={carManager}>
          <Piece  isKnight = {isKnight} type = {type} id = {id} carManager = {carManager}/>
        </ColumnGrid>
      </div>
    );
  }
  


 // Array to hold all the squares of the board
 const squares = [];
 
//squares.push(renderHeader(-7));
squares.push(renderAppBar(-8))
 for (let i = -6; i < 0; i += 1) {
   squares.push(renderColumnHeader(i));
 }

 for (let i = 0; i < 48; i += 1) {
   squares.push(renderColumnSpace(i));
 }
 
/*
  // Loop to generate 64 squares (8x8 grid)
  for (let i = 0; i < 48; i += 1) {
    squares.push(renderSquare(i))
  }
*/
  // Render the board by displaying all the squares within a div styled as the board
  return <div style={boardStyle}>{squares}</div>
}

