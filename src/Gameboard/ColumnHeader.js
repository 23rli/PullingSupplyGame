import { fontStyle } from "@mui/system";

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

    //IMport source sans pro  or font called play
};

// Square component representing each square on the chessboard
export const ColumnHeader = ({ x, y, roundManager }) => {
    // Determine background and text colors based on the column index (x)
    let backgroundColor = '';
    const color = 'black';
    let title = '';

    if (x === -6) {
        backgroundColor = 'gray';
        title = 'Planning';
    } else if (x === -5) {
        backgroundColor = 'rgba(255, 25, 25, 1)';
        title = 'Manufacturing';
    } else if (x === -4) {
        backgroundColor = 'rgba(255, 245, 0, 1)';
        title = 'Assembly';
    } else if (x === -3) {
        backgroundColor = '#2196f3';
        title = 'Quality';
    } else if (x === -2 && !roundManager.paintStatus) {
        backgroundColor = 'white';
        title = 'Paint';
    } else if (x === -2 && roundManager.paintStatus) {
        backgroundColor = 'wheat';
        title = 'Dry';
    } else {
        backgroundColor = 'chartreuse';
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
