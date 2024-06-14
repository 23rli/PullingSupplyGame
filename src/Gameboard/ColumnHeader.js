const headerStyle = {
  width: '100%',  // Full width of the parent container
  height: '100%', // Full height of the parent container
  display: 'flex',  // Use flexbox for alignment
  alignItems: 'center',  // Center the items vertically
  justifyContent: 'center',  // Center the items horizontally
  textAlign: 'center',  // Center the text
  fontSize: 'calc(1em + 1vw)',  // Responsive font size
  overflow: 'hidden',  // Hide overflow
  whiteSpace: 'nowrap',  // Prevent text wrapping
  textOverflow: 'ellipsis',  // Add ellipsis if text overflows
};

// Square component representing each square on the chessboard
export const ColumnHeader = ({ x, y, children }) => {
  // Determine background and text colors based on the column index (x)
  let backgroundColor = '';
  const color = 'black';
  let title = '';

  if (x === 0) {
      backgroundColor = 'gray';
      title = 'Planning';
  } else if (x === 1) {
      backgroundColor = 'red';
      title = 'Manufacturing';
  } else if (x === 2) {
      backgroundColor = 'yellow';
      title = 'Assembly';
  } else if (x === 3) {
      backgroundColor = 'blue';
      title = 'Quality';
  } else if (x === 4) {
      backgroundColor = 'white';
      title = 'Paint and Dry';
  } else {
      backgroundColor = 'green';
      title = 'Done';
  }

  return (
      <div
          style={{
              ...headerStyle,    // Apply base square styles
              color,             // Text color
              backgroundColor,   // Background color
              border: '1px solid black',  // Black border
              opacity: '75%'
          }}
      >
          {title}
      </div>
  );
};
