// Importing the useMemo hook from React
import { useMemo } from 'react'

// Importing the Board component from the same directory
import { Board } from './Gameboard/Board.js'

// Importing the Game class from the same directory
import { Game } from './Game.js'

// Styling properties applied to the container of the chessboard
const containerStyle = {
  width: Math.max( window.innerWidth, document.body.clientWidth ),        // Width of the container
  height: Math.max( window.innerHeight, document.body.clientHeight ),               // Height of the container
  border: '1px solid gray',  // Border styling
}

/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
  // useMemo to create a single instance of the Game object
  const game = useMemo(() => new Game(), [])
  
  return (
    // Container div styled with containerStyle
    <div style={containerStyle}>
      {/* Render the Board component, passing the game object as a prop */}
      <Board game={game} />
    </div>
  )
}
