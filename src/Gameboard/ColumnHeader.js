// Styling properties applied to each square element
const headerStyle = {
    width: '100%',  // Full width of the parent container
    height: '100%', // Full height of the parent container
  }
  
  // Square component representing each square on the chessboard
  export const ColumnHeader = ({x,y, children }) => {
    // Determine background and text colors based on whether the square is black or white
    let backgroundColor =  '';  // Set background color to black if black prop is true, otherwise white
    const color = 'black';  // Set text color to white if black prop is true, otherwise black
    let title = '';

    if(x == 0){
        backgroundColor = 'gray';
        title = 'Planning';
    }else if (x == 1){
        backgroundColor = 'red';
        title = 'Manufacturing';
    }else if (x == 2){
        backgroundColor = 'yellow';
        title = 'Assembly';
    }else if (x == 3){
        backgroundColor = 'blue';
        title = 'Quality';
    }else if (x == 4){
        backgroundColor = 'white'
        title = 'Paint and Dry';
    }else{
        backgroundColor = 'green'
        title = 'Done';
    } 
  
    
    return (
      <div
        style={{
          ...headerStyle,    // Apply base square styles
          color,             // Text color
          backgroundColor,   // Background color
          border: '1px solid black',  // Black border
        }}
      >
        {title}
      </div>
    )
  }
  