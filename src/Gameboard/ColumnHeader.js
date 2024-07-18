import { fontStyle } from "@mui/system";

const headerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 'calc(1em + 1vw)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    backgroundColor: '#2c387e',
    color: 'white', // Add default text color
};

const titleStyle = {
    fontSize: 'calc(0.70em + 0.70vw)', // Larger font size for the title
    fontWeight: 'bold', // Make the title bold
};

const subtitleStyle = {
    fontSize: 'calc(0.5em + 0.3vw)', // Smaller font size for the subtitle
    fontStyle: 'italic', // Italicize the subtitle
};


// Square component representing each square on the chessboard
export const ColumnHeader = ({ x, y, roundManager }) => {
    // Determine background and text colors based on the column index (x)
    let backgroundColor = '';
    const color = 'black';
    let title = '';
    let subtitle = 'Wait Time: 1 Turn'

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
        subtitle = 'Wait Time: 2 Turns'
    } else if (x === -2 && roundManager.paintStatus) {
        backgroundColor = 'wheat';
        title = 'Dry';
        subtitle = 'Wait Time: 2 Turns'
    } else {
        backgroundColor = 'chartreuse';
        title = 'Done';
        subtitle = ''
    }

    return (
        <div
            style={{
                ...headerStyle,
                color,
                backgroundColor,
                border: '1px solid black',
                opacity: '75%',
            }}
        >
            <div style={titleStyle}>{title}</div>
            <div style={subtitleStyle}>{subtitle}</div>
        </div>
    );
};
