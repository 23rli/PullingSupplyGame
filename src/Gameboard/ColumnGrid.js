import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Pieces/ItemTypes.js';
import { Overlay, OverlayType } from './Overlay.js';
import { ColumnContainer } from './ColumnContainer.js';
import TransitionsSnackbar from '../Error Statements/Error.js';

export const ColumnGrid = ({ x, y, children, roundManager }) => {
  const [message, setMessage] = useState(''); // Manage the error message
  const [error, setError] = useState(false);  // Manage whether the error is open

  // Automatically close the Snackbar after the timeout or when message is cleared
  useEffect(() => {
    if (error && message) {
      const timer = setTimeout(() => {
        setError(false);
        setMessage('');  // Clear the message after error closes
        roundManager.errorDisplay = false;
      }, 2000);  // Keep it in sync with the Snackbar duration

      return () => clearTimeout(timer); // Cleanup the timeout
    }
  }, [error, message]);

  // Drop target setup
  const products = [ItemTypes.GCAR, ItemTypes.BCAR, ItemTypes.RCAR, ItemTypes.YCAR];

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: products,
      canDrop: (item) => {
        const car = item.id; // Assuming item.id contains car's data including current x, y coordinates

        // Condition to skip error if the car is already at this grid position
        if (car.x === x && car.y === y) {
          return false; // Skip any error handling if car is at the same position
        }

        // Proceed with usual checks for valid movement
        if (!roundManager.canMoveCar(x, y, car.id, roundManager.cars)) {
          const newMessage = roundManager.movementError();
          if (newMessage !== message) {
            setMessage(newMessage);  // Set new error message
            setError(true);          // Trigger the Snackbar to open
            roundManager.errorDisplay = true;
          }
          return false;
        } else if (roundManager.checkPaintStatus(x, y)) {
          return true;
        } else {
          setMessage("A painting process is already in progress. Please wait.");
          setError(true);
          roundManager.errorDisplay = true;
          return false;
        }
      },
      drop: (item) => {
        roundManager.moveCar(x, y, item.id.id, true);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [roundManager, message, error, x, y]  // Add dependencies to include relevant state
  );

  return (
    <>
      {/* Snackbar for displaying error messages */}
      <TransitionsSnackbar 
        errorStatement={message}
        open={error}
        onClose={() => {
          setError(false);           // Manually close Snackbar
          setMessage('');            // Clear the error message
          roundManager.errorDisplay = false;
        }}
      />
      
      <div
        ref={drop}  // Assigning the drop target ref to this div
        role="Space"
        data-testid={`(${x},${y})`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* ColumnContainer component for the grid */}
        <ColumnContainer x={x} y={y} roundManager={roundManager}>
          {children}
        </ColumnContainer>

        {/* Conditionally render overlays based on drag and drop state */}
        {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
        {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
        {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
      </div>
    </>
  );
};
