// Importing necessary hooks from React
import { useEffect, useState } from 'react'

// Importing the BoardSquare component from the same directory
import { BoardSquare } from './BoardSquare.js'

// Importing the Piece component from the same directory
import { Piece } from '../Pieces/Piece.js'

// Styling properties applied to the board element
const boardStyle = {
  width: '100%',      // Full width of the container
  height: '100%',     // Full height of the container
  display: 'flex',    // Flexbox layout
  flexWrap: 'wrap',   // Wrap children to the next line
}

// Styling properties applied to each square element
const squareStyle = { width: '16.33%', height: '17%' }  // Each square takes 12.5% of the width and height (8x8 grid)
const columnStyle = { width: '16.33%', height: '17%' }
const headerStyle = { width: '25%', height: '15%'}
const resourceBoardStyle = { width: '50%', height: '3%'}
const resourceSlotStyle = { width: '3.333%', height: '6%'}

/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }) => {
  // Destructuring knight's position from the state and a function to update it
  const [[knightX, knightY], setKnightPos] = useState(game.knightPosition)
  
  // useEffect to set up an observer for the game state
  useEffect(() => game.observe(setKnightPos))

  // Function to render a single square on the board
  function renderSquare(i) {
    const x = i % 6              // Calculate x-coordinate (column) of the square
    const y = Math.floor(i / 6)  // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={squareStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <BoardSquare x={x} y={y} game={game}>
          {/* Render the Piece component, indicating if the piece is the knight */}
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    )
  }
    // Function to render a single square on the board
    function renderResourceSquare(i) {
      const y = i % 2              // Calculate x-coordinate (column) of the square
      const x = Math.floor(i / 2)  // Calculate y-coordinate (row) of the square
      return (
        <div key={i} style={squareStyle}>
          {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
          <BoardSquare x={x} y={y} game={game}>
            {/* Render the Piece component, indicating if the piece is the knight */}
            <Piece isKnight={x === knightX && y === knightY} />
          </BoardSquare>
        </div>
      )
    }

  // Function to render a single square on the board
  function renderHeader(i) {
    const x = 0              // Calculate x-coordinate (column) of the square
    const y = 0  // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={squareStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <BoardSquare x={x} y={y} game={game}>
          {/* Render the Piece component, indicating if the piece is the knight */}
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    )
  }

  // Function to render a single square on the board
  function renderColumnHeader(i) {
    const x = 1            // Calculate x-coordinate (column) of the square
    const y = 0 // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={squareStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <BoardSquare x={x} y={y} game={game}>
          {/* Render the Piece component, indicating if the piece is the knight */}
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    )
  }

  // Function to render a single square on the board
  function renderColumnSpace(i) {
    const y = 3 + i % 6              // Calculate x-coordinate (column) of the square
    const x = Math.floor(i / 8)  // Calculate y-coordinate (row) of the square
    return (
      <div key={i} style={squareStyle}>
        {/* Render the BoardSquare component, passing x and y coordinates and the game object */}
        <BoardSquare x={x} y={y} game={game}>
          {/* Render the Piece component, indicating if the piece is the knight */}
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    )
  }

  // Array to hold all the squares of the board
  const squares = []
  squares.push(renderHeader(0));
  squares.push(renderColumnHeader(1));
  for (let i = 2; i < 34; i += 1){
      squares.push(renderResourceSquare(i))
  }
  squares.push(renderHeader(34));

  for (let i = 35; i < 84; i += 1){
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
