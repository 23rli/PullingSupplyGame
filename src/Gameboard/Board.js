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
const squareStyle = { width: '12.5%', height: '12.5%' }  // Each square takes 12.5% of the width and height (8x8 grid)

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
    const x = i % 8              // Calculate x-coordinate (column) of the square
    const y = Math.floor(i / 8)  // Calculate y-coordinate (row) of the square
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
  
  // Loop to generate 64 squares (8x8 grid)
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i))
  }

  // Render the board by displaying all the squares within a div styled as the board
  return <div style={boardStyle}>{squares}</div>
}
