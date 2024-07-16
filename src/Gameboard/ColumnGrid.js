// Importing useDrop hook from react-dnd library
import { useDrop } from 'react-dnd'
import React from 'react'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../Pieces/ItemTypes.js'

// Importing Overlay component and OverlayType constant from the same directory
import { Overlay, OverlayType } from './Overlay.js'

// Importing Square component from the same directory
import { ColumnContainer } from './ColumnContainer.js'

import TransitionsSnackbar from '../Error Statements/Error.js'

// BoardSquare component that represents each square on the chessboard
export const ColumnGrid = ({ x, y, children, roundManager }) => {

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState('');

  // Function to handle setting error message and managing snackbar
  const handleErrorMessage = (newMessage) => {
    if (newMessage && newMessage !== currentMessage) {
      setError(false); // Close the current snackbar
      setTimeout(() => {
        setMessage(newMessage);
        setError(true); // Open the new snackbar with the new message
        setCurrentMessage(newMessage);
      }, 100); // Small delay to ensure the snackbar closes before opening a new one
    }
  };

  // Setting up the drop target for the knight using the useDrop hook
  const products = [ItemTypes.GCAR, ItemTypes.BCAR];

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: products,  // Accepts items of type KNIGHT, GCAR, and BCAR
      canDrop: (item) => {
        const newMessage = !roundManager.canMoveCar(x, y, item.id.id, roundManager.cars)
          ? roundManager.movementError()
          : !roundManager.checkPaintStatus(x, y)
            ? "A painting process is already in progress. Please wait for its conclusion to add another vehicle"
            : null;

        handleErrorMessage(newMessage);
        return !newMessage;
      },
      drop: (item) => {
        if (item.id.type === ItemTypes.BCAR) {
          roundManager.moveCar(x, y, item.id.id, true);
        } else if (item.id.type === ItemTypes.GCAR) {
          roundManager.moveCar(x, y, item.id.id, false);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),  // Whether an item is currently being hovered over this square
        canDrop: !!monitor.canDrop(),  // Whether the item can be dropped on this square
      }),
    }),
    [roundManager, currentMessage],  // Dependency array containing game object
  )

  return (
    <>
      <TransitionsSnackbar
        errorStatement={message}
        open={error}
        onClose={() => {
          setError(false);
          setCurrentMessage(''); // Reset currentMessage when Snackbar closes
        }}
        timeOpen={2000}
      />
      
      <div
        ref={drop}  // Assigning the drop target ref to this div
        role="Space"
        data-testid={`(${x},${y})`}
        style={{
          position: 'relative',
          width: '100%',  // Full width of the parent container
          height: '100%',  // Full height of the parent container
        }}
      >
        {/* Render the Square component, passing whether the square is black */}
        <ColumnContainer x={x} y={y} roundManager={roundManager}>
          {children}
        </ColumnContainer>

        {/* Conditionally render different overlays based on drag and drop state */}
        {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
        {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
        {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
      </div>
    </>
  )
}
