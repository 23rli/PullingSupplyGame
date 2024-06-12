// Exporting an enum-like object OverlayType for different overlay types
export var OverlayType;
(function (OverlayType) {
  // Defining the values for different overlay types
  OverlayType['IllegalMoveHover'] = 'Illegal';
  OverlayType['LegalMoveHover'] = 'Legal';
  OverlayType['PossibleMove'] = 'Possible';
})(OverlayType || (OverlayType = {}));

// Overlay component to display visual hints on the board
export const Overlay = ({ type }) => {
  // Get the corresponding color for the overlay type
  const color = getOverlayColor(type);
  
  return (
    <div
      className="overlay"  // CSS class for the overlay
      role={type}  // ARIA role indicating the type of the overlay
      style={{
        position: 'absolute',  // Positioned absolutely within the parent
        top: 0,  // Align to the top
        left: 0,  // Align to the left
        height: '100%',  // Full height of the parent
        width: '100%',  // Full width of the parent
        zIndex: 1,  // Ensure overlay is above other elements
        opacity: 0.5,  // Semi-transparent
        backgroundColor: color,  // Background color based on the overlay type
      }}
    />
  );
}

// Function to get the color based on the overlay type
function getOverlayColor(type) {
  switch (type) {
    case OverlayType.IllegalMoveHover:
      return 'red';  // Red color for illegal move hover
    case OverlayType.LegalMoveHover:
      return 'green';  // Green color for legal move hover
    case OverlayType.PossibleMove:
      return 'blue';  // Blue color for possible move
  }
}
