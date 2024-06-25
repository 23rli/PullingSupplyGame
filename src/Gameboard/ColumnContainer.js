const containerStyle = {
  width: '100%',  // Full width of the parent container
  height: '100%', // Full height of the parent container
  display: 'flex',  // Use flexbox for alignment if needed
  alignItems: 'center',  // Center items vertically
  justifyContent: 'center',  // Center items horizontally
  textAlign: 'center',  // Center text
  overflow: 'hidden',  // Hide overflow
  whiteSpace: 'nowrap',  // Prevent text wrapping
  textOverflow: 'ellipsis',  // Add ellipsis if text overflows
};

const BoxStyle = {
    width: '99%',  // Full width of the parent container
    height: '99%', // Full height of the parent container
    display: 'flex',  // Use flexbox for alignment if needed
    alignItems: 'center',  // Center items vertically
    justifyContent: 'center',  // Center items horizontally
    textAlign: 'center',  // Center text
    overflow: 'hidden',  // Hide overflow
    whiteSpace: 'nowrap',  // Prevent text wrapping
    textOverflow: 'ellipsis',  // Add ellipsis if text overflows
  };

const getBackgroundColor = (x) => {
  switch (x) {
      case 0:
          return 'rgba(128, 128, 128, 0.5)'; // Gray with 50% opacity
      case 1:
          return 'rgba(255, 0, 0, 0.5)'; // Red with 50% opacity
      case 2:
          return 'rgba(255, 255, 0, 0.5)'; // Yellow with 50% opacity
      case 3:
          return 'rgba(0, 0, 255, 0.5)'; // Blue with 50% opacity
      case 4:
          return 'rgba(255, 255, 255, 0.5)'; // White with 50% opacity
      default:
          return 'rgba(0, 128, 0, 0.5)'; // Green with 50% opacity
  }
}

const getDividerColor = (x) => {
    switch (x) {
        case 0:
            return 'rgba(128, 128, 128, 0.75)'; // Gray with 50% opacity
        case 1:
            return 'rgba(255, 0, 0, 0.75)'; // Red with 50% opacity
        case 2:
            return 'rgba(255, 255, 0, 0.75)'; // Yellow with 50% opacity
        case 3:
            return 'rgba(0, 0, 255, 0.75)'; // Blue with 50% opacity
        case 4:
            return 'rgba(255, 255, 255, 0.75)'; // White with 50% opacity
        default:
            return 'rgba(0, 128, 0, 0.75)'; // Green with 50% opacity
    }
  }

// Square component representing each square on the chessboard
export const ColumnContainer = ({ x, y, children }) => {
  const backgroundColor = getBackgroundColor(x);
  const dividerColor = getDividerColor(x)

  return (
      <div
          style={{
              ...containerStyle,    // Apply base square styles
          }}
      >
        <div
            style={{
                ...BoxStyle,
                color: 'black',        // Text color
                backgroundColor,       // Background color with transparency
                outlineStyle: 'solid',
                outlineColor: dividerColor,  //maybe fix overlapping colors}}
            }}>
                {children}
            </div>
      </div>
  );
}