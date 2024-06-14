// Importing necessary hooks from React
import { useEffect, useState } from 'react'

// Importing the BoardSquare component from the same directory
import { ColumnGrid } from './ColumnGrid.js'

import { ColumnHeader } from './ColumnHeader.js'

import {Header} from './Header.js'

// Importing the Piece component from the same directory
import { Piece } from '../Pieces/Piece.js'

//import {BlueCarInitializer} from '../Pieces/BlueCarInitializer.js'

//import {GreenCarInitializer, GreenCars} from '../Pieces/GreenCarInitializer.js'


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
export const Board = ({game}) => {

  const [[knightX, knightY], setKnightPos] = useState(game.knightPosition)
 const [[BCar1X, BCar1Y],  setBCar1Pos] = useState(game.knightPosition);
/*  const [[BCar2X, BCar2Y],  setBCar2Pos] = useState();
  const [[BCar3X, BCar3Y],  setBCar3Pos] = useState();
  const [[BCar4X, BCar4Y],  setBCar4Pos] = useState();
  const [[BCar5X, BCar5Y],  setBCar5Pos] = useState();
  const [[BCar6X, BCar6Y],  setBCar6Pos] = useState();
  const [[BCar7X, BCar7Y],  setBCar7Pos] = useState();
  const [[BCar8X, BCar8Y],  setBCar8Pos] = useState();
  const [[BCar9X, BCar9Y],  setBCar9Pos] = useState();
  const [[BCar10X, BCar10Y],  setBCar10Pos] = useState();
  const [[BCar11X, BCar11Y],  setBCar11Pos] = useState();
  const [[BCar12X, BCar12Y],  setBCar12Pos] = useState();
  const [[BCar13X, BCar13Y],  setBCar13Pos] = useState();
  const [[BCar14X, BCar14Y],  setBCar14Pos] = useState();
  const [[BCar15X, BCar15Y],  setBCar15Pos] = useState();

  const [[GCar1X, GCar1Y],  setGCar1Pos] = useState();
  const [[GCar2X, GCar2Y],  setGCar2Pos] = useState();
  const [[GCar3X, GCar3Y],  setGCar3Pos] = useState();
  const [[GCar4X, GCar4Y],  setGCar4Pos] = useState();
  const [[GCar5X, GCar5Y],  setGCar5Pos] = useState();
  const [[GCar6X, GCar6Y],  setGCar6Pos] = useState();
  const [[GCar7X, GCar7Y],  setGCar7Pos] = useState();
  const [[GCar8X, GCar8Y],  setGCar8Pos] = useState();
  const [[GCar9X, GCar9Y],  setGCar9Pos] = useState();
  const [[GCar10X, GCar10Y],  setGCar10Pos] = useState();
  const [[GCar11X, GCar11Y],  setGCar11Pos] = useState();
  const [[GCar12X, GCar12Y],  setGCar12Pos] = useState();
  const [[GCar13X, GCar13Y],  setGCar13Pos] = useState();
  const [[GCar14X, GCar14Y],  setGCar14Pos] = useState();
  const [[GCar15X, GCar15Y],  setGCar15Pos] = useState();
  */
  // useEffect to set up an observer for the game state
  useEffect(() => game.observe(setKnightPos, setBCar1Pos))
  //useEffect(() => game.observe(setBluePos))
  //useEffect(() => game.observe(setGreenPos))

    // Function to render a single square on the board
  function renderHeader(i) {
    const x = 0              // Calculate x-coordinate (column) of the square
    const y = 0  // Calculate y-coordinate (row) of the square
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
        <ColumnHeader x={x} y={y} game={game}>

        </ColumnHeader>
      </div>
    )
  }

  // Function to render a single square on the board
  function renderColumnSpace(i) {
    const x = i % 6              // Calculate x-coordinate (column) of the square
    const y = Math.floor(i / 6)  // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={columnStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <ColumnGrid x={x} y={y} game={game} >
          {/* Render the Piece component, indicating if the piece is the knight */}
          <Piece isKnight={x === knightX && y === knightY} />
        </ColumnGrid>
      </div>
    )
  }

  // Array to hold all the squares of the board
  const squares = []
  squares.push(renderHeader(0));
  //squares.push(renderBoardHeader(1))
  //for (let i = 3; i < 35; i += 1){
   //squares.push(renderResourceSquare(1))
  //}
  for(let i = 0; i < 6; i += 1){
    squares.push(renderColumnHeader(i))
  }
  for (let i = 0; i < 48; i += 1){
   squares.push(renderColumnSpace(i))
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
