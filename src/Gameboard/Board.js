// Importing necessary hooks from React
import { useEffect, useState } from 'react'

// Importing the BoardSquare component from the same directory
import { ColumnGrid } from './ColumnGrid.js'

import { ColumnHeader } from './ColumnHeader.js'

import {Header} from './Header.js'

// Importing the Piece component from the same directory
import { Piece } from '../Pieces/Piece.js'


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
  const [blueCarsCoords, setBlueCarsCoords] = useState(carManager.blueCarsCoords);
  const [greenCarsCoords, setGreenCarsCoords] = useState(carManager.greenCarsCoords);

   // useEffect to set up an observer for the game state
   useEffect(() => {
    game.observe(setKnightPos);
    carManager.observe(setBlueCarsCoords);
    carManager.observe(setGreenCarsCoords);
  }, [game, carManager]);
  /*
  const [[knightX, knightY], setKnightPos] = useState(game.knightPosition)
  console.log(carManager.blueCarsCoords[0])
  const [[BCar0X, BCar0Y],  setBCar0Pos] = useState(carManager.blueCarsCoords[0]);
  
  const [[BCar1X, BCar1Y],  setBCar1Pos] = useState(carManager.blueCarCoords[1]);
  const [[BCar2X, BCar2Y],  setBCar2Pos] = useState(carManager.blueCarCoords[2]);
  const [[BCar3X, BCar3Y],  setBCar3Pos] = useState(carManager.blueCarCoords[3]);
  const [[BCar4X, BCar4Y],  setBCar4Pos] = useState(carManager.blueCarCoords[4]);
  const [[BCar5X, BCar5Y],  setBCar5Pos] = useState(carManager.blueCarCoords[5]);
  const [[BCar6X, BCar6Y],  setBCar6Pos] = useState(carManager.blueCarCoords[6]);
  const [[BCar7X, BCar7Y],  setBCar7Pos] = useState(carManager.blueCarCoords[7]);
  const [[BCar8X, BCar8Y],  setBCar8Pos] = useState(carManager.blueCarCoords[8]);
  const [[BCar9X, BCar9Y],  setBCar9Pos] = useState(carManager.blueCarCoords[9]);
  const [[BCar10X, BCar10Y],  setBCar10Pos] = useState(carManager.blueCarCoords[10]);
  const [[BCar11X, BCar11Y],  setBCar11Pos] = useState(carManager.blueCarCoords[11]);
  const [[BCar12X, BCar12Y],  setBCar12Pos] = useState(carManager.blueCarCoords[12]);
  const [[BCar13X, BCar13Y],  setBCar13Pos] = useState(carManager.blueCarCoords[13]);
  const [[BCar14X, BCar14Y],  setBCar14Pos] = useState(carManager.blueCarCoords[14]);

  const [[GCar0X, GCar0Y],  setGCar0Pos] = useState(carManager.greenCarCoords[0]);
  const [[GCar1X, GCar1Y],  setGCar1Pos] = useState(carManager.greenCarCoords[1]);
  const [[GCar2X, GCar2Y],  setGCar2Pos] = useState(carManager.greenCarCoords[2]);
  const [[GCar3X, GCar3Y],  setGCar3Pos] = useState(carManager.greenCarCoords[3]);
  const [[GCar4X, GCar4Y],  setGCar4Pos] = useState(carManager.greenCarCoords[4]);
  const [[GCar5X, GCar5Y],  setGCar5Pos] = useState(carManager.greenCarCoords[5]);
  const [[GCar6X, GCar6Y],  setGCar6Pos] = useState(carManager.greenCarCoords[6]);
  const [[GCar7X, GCar7Y],  setGCar7Pos] = useState(carManager.greenCarCoords[7]);
  const [[GCar8X, GCar8Y],  setGCar8Pos] = useState(carManager.greenCarCoords[8]);
  const [[GCar9X, GCar9Y],  setGCar9Pos] = useState(carManager.greenCarCoords[9]);
  const [[GCar10X, GCar10Y],  setGCar10Pos] = useState(carManager.greenCarCoords[10]);
  const [[GCar11X, GCar11Y],  setGCar11Pos] = useState(carManager.greenCarCoords[11]);
  const [[GCar12X, GCar12Y],  setGCar12Pos] = useState(carManager.greenCarCoords[12]);
  const [[GCar13X, GCar13Y],  setGCar13Pos] = useState(carManager.greenCarCoords[13]);
  const [[GCar14X, GCar14Y],  setGCar14Pos] = useState(carManager.greenCarCoords[14]);

  // useEffect to set up an observer for the game state
  useEffect(() => {
    game.observe(setKnightPos);
    carManager.observe(setBCar0Pos);
    carManager.observe( setBCar1Pos, setBCar2Pos, setBCar3Pos, setBCar4Pos, setBCar5Pos, setBCar6Pos,
      setBCar7Pos, setBCar8Pos, setBCar9Pos, setBCar10Pos, setBCar11Pos, setBCar12Pos, setBCar13Pos, setBCar14Pos, setBCar0Pos, 
      setGCar1Pos, setGCar2Pos, setGCar3Pos, setGCar4Pos, setGCar5Pos, setGCar6Pos, setGCar7Pos, setGCar8Pos, setGCar9Pos, setGCar10Pos, 
    setGCar11Pos, setGCar12Pos, setGCar13Pos, setGCar14Pos, setGCar0Pos);
  console.log("game:", game);
  console.log("carManager:", carManager);
  // Add more logs as needed to debug specific state or prop issues
}, [game, carManager]);

  //useEffect(() => game.observe(setBluePos))
  //useEffect(() => game.observe(setGreenPos))
  */
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
        <ColumnHeader x={x} y={y}>

        </ColumnHeader>
      </div>
    )
  }

  function renderColumnSpace(i) {
    const x = i % 6;              // Calculate x-coordinate (column) of the square
    const y = Math.floor(i / 6);  // Calculate y-coordinate (row) of the square
    const isKnight = x === knightX && y === knightY;
    const isBlueCar = carManager.hasBlueCar(x,y);//blueCarPositions.some(([bx, by]) => x === bx && y === by);
    const isGreenCar = carManager.hasGreenCar(x,y);// greenCarPositions.some(([gx, gy]) => x === gx && y === gy);
    //console.log("x:", x, "y:", y, "isKnight:", isKnight);
    //console.log("isBlueCar:", isBlueCar, "isGreenCar:", isGreenCar);
    
    return (
      <div key={i} style={columnStyle}>
        <ColumnGrid x={x} y={y} game={game} carManager={carManager}>
          <Piece isKnight={isKnight} />
          {/*In future add variable for model. This way the correct blue visual can be selected from the bank to represent to car*/}
          <Piece isBlueCar={isBlueCar} />
          <Piece isGreenCar={isGreenCar} />
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

