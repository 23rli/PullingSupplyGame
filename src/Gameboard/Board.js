// Importing necessary hooks from React
import { useEffect, useState } from 'react'

// Importing the BoardSquare component from the same directory
import { ColumnGrid } from './ColumnGrid.js'

import { ColumnHeader } from './ColumnHeader.js'

import {Header} from './Header.js'

// Importing the Piece component from the same directory
import { Piece } from '../Pieces/Piece.js'
import { ItemTypes } from '../Pieces/ItemTypes.js'


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
const columnHeaderStyle = { width: '16.666%', height: '5%' }
const headerStyle = { width: '100%', height: '10%'}


/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({game, carManager}) => {
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
 squares.push(renderHeader(-7));
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

