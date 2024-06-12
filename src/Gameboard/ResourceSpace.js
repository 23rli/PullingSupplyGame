// Styling properties applied to each square element
const resourceStyle = {
    width: '90%',  // Full width of the parent container
    height: '90%', // Full height of the parent container
  }
  
  // Square component representing each square on the chessboard
  export const ResourceSpace = ({ color, children }) => {
    // Determine background and text colors based on whether the square is black or white
    const backgroundColor = {color};  // Set background color to black if black prop is true, otherwise white
    const textColor = 'black';  // Set text color to white if black prop is true, otherwise black
    
    return (
      <div
        style={{
          ...resourceStyle,    // Apply base square styles
          textColor,             // Text color
          backgroundColor,   // Background color
          border: '1px solid black',  // Black border
        }}
      >
        {children}
      </div>
    )
  }
  