// Importing necessary hooks and components from react-dnd library
import { DragPreviewImage, useDrag } from 'react-dnd'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'
import { CarManager } from '../CarManager.js'

// Knight component representing the knight piece on the chessboard
export const GreenCarVisual = ({id, carManager}) => {
  // Setting up the drag source using the useDrag hook
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.GCAR,  // Type of the draggable item
      item: {id},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),  // Collecting the dragging state
      }),
    }),
    [id,carManager],  // Dependency array (empty means no dependencies)
  )

  return (
    <>
      {/* DragPreviewImage for showing a custom drag preview */}
      <DragPreviewImage connect={preview} src="./greenCar.png" />
      <img
        ref={drag}
        src = {require("./greenCar.png")}
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