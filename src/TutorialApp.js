// Importing the useMemo hook from React
import { useMemo } from 'react'

// Importing the Board component from the same directory
import { Board } from './Gameboard/Board.js'
import { Round } from './Rules/Round.js'
import { LongMemory } from './Rules/LongMemory.js';


// Styling properties applied to the container of the chessboard
const containerStyle = {
  display: 'flex',            // Flexbox layout
  justifyContent: 'center',   // Center horizontally
  alignItems: 'center',       // Center vertically
  width: '100vw',             // Full viewport width
  height: '160vh',            // Full viewport height
  margin: 0,                  // Remove default margin
  padding: 0,                 // Remove default padding
  backgroundColor: '#2c387e', // Light gray background color (you can change this to any color you prefer)
};


/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
  // useMemo to create a single instance of the Game object
  
  const roundManager = useMemo(() => new Round(0, 15), []);
  const longMemory = useMemo(() => new LongMemory(roundManager.totalRounds), []);
  console.log(longMemory)
  return (
    // Container div styled with containerStyle
    <div style={containerStyle}>
      {/* Render the Board component, passing the game object as a prop */}
      <Board roundManager={roundManager}  longMemory = {longMemory} />
    </div>
  )

}
