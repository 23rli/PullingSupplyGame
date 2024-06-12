// Styling properties applied to each square element
const squareStyle = {
  width: '100%',  // Full width of the parent container
  height: '100%', // Full height of the parent container
}

// Square component representing each square on the chessboard
export const Square = ({ black, children }) => {
  // Determine background and text colors based on whether the square is black or white
  const backgroundColor = black ? 'black' : 'white';
  const color = black ? 'white' : 'black';
  
  return (
    <div
      style={{
        ...squareStyle,    // Apply base square styles
        color,             // Text color
        backgroundColor,   // Background color
      }}
    >
      {children // Render any children passed to the Square component
      }
    </div>
  )
}