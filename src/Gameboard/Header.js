// Styling properties applied to each square element
const headerStyle = {
  width: '100%',  // Full width of the parent container
  height: '100%', // Full height of the parent container
  display: 'flex',  // Use flexbox for alignment
  alignItems: 'center',  // Center the items vertically
  justifyContent: 'center',  // Center the items horizontally
  textAlign: 'center',  // Center the text
  fontSize: 'calc(2em + 2vw)',  // Responsive font size
  overflow: 'hidden',  // Hide overflow
  whiteSpace: 'nowrap',  // Prevent text wrapping
  textOverflow: 'ellipsis',  // Add ellipsis if text overflows
};
  
  // Square component representing each square on the chessboard
  export const Header = ({ children }) => {
    // Determine background and text colors based on whether the square is black or white
    const backgroundColor =  'yellow';  // Set background color to black if black prop is true, otherwise white
    const color = 'black';  // Set text color to white if black prop is true, otherwise black
    
    return (
      <div
        style={{
          ...headerStyle,    // Apply base square styles
          color,             // Text color
          backgroundColor,   // Background color
        }}
      >
        Motor City...Online
      </div>
    )
  }
  