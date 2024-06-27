// Importing necessary hooks and components from react-dnd library
import { DragPreviewImage, useDrag } from 'react-dnd'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'
import { CarManager } from '../CarManager.js';

// Knight component representing the knight piece on the chessboard
export const BlueCarVisual = ({id, carManager}) => {
  // Setting up the drag source using the useDrag hook

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BCAR,  // Type of the draggable item
      item: {id},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),  // Collecting the dragging state
      }),
    }),
    [id, carManager],  // Dependency array (empty means no dependencies)
  )
  return (
    <>
      {/* DragPreviewImage for showing a custom drag preview */}
      <DragPreviewImage connect={preview} src="./blueCar.png" />
      <img
        ref={drag}
        src = {require("./blueCar.png")}
        alt = "failure"
        width = "150px"
        style={{ 
          border: isDragging ? "5px solid pink" : "0px",
          opacity: isDragging ? 0.5 : 1,  // Changing opacity when dragging 
        }}
      />
    </>
  )
}