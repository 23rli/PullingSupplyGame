// Styling properties applied to each square element
const headerStyle = {
    width: '100%',  // Full width of the parent container
    height: '100%', // Full height of the parent container
  }
  
  // Square component representing each square on the chessboard
  export const ColumnHeader = ({x,y, children }) => {
    // Determine background and text colors based on whether the square is black or white
    const backgroundColor =  '';  // Set background color to black if black prop is true, otherwise white
    const color = 'black';  // Set text color to white if black prop is true, otherwise black

    if(x == 0){
        backgroundColor = 'gray';
    }else if (x == 1){
        backgroundColor = 'red';
    }else if (x==2){
        backgroundColor = 'yellow';
    }else if (x == 3){
        backgroundColor = 'blue';
    }else if (x == 4){
        backgroundColor = 'white'
    }else{
        backgroundColor = 'green'
    } 
  
    
    return (
      <div
        style={{
          ...headerStyle,    // Apply base square styles
          color,             // Text color
          backgroundColor,   // Background color
        }}
      >
        {children}
      </div>
    )
  }
  