// Importing necessary hooks and components from react-dnd library
import { DragPreviewImage, useDrag } from 'react-dnd';

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js';

// BlueCarVisual component representing the blue car piece
export const GreenCarVisual = ({ id, roundManager, imageURL }) => {
  // Setting up the drag source using the useDrag hook
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.GCAR,  // Type of the draggable item
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),  // Collecting the dragging state
      }),
    }),
    [id, roundManager],  // Dependency array
  );

  return (
    <>
      {/* DragPreviewImage for showing a custom drag preview */}
      <DragPreviewImage connect={preview} src={imageURL} />
      <img
        ref={drag}
        src={imageURL}  // Directly use the imageURL prop
        alt="Green Car"
        width="150px"
        style={{
          border: isDragging ? "5px solid pink" : "0px",
          opacity: isDragging ? 0.5 : 1,  // Changing opacity when dragging 
        }}
      />
    </>
  );
};
