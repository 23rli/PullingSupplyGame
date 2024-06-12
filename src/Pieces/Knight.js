// Importing necessary hooks and components from react-dnd library
import { DragPreviewImage, useDrag } from 'react-dnd'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'

// Importing knightImage for the drag preview
import { knightImage } from './knightImage.js'

// Styling properties applied to the knight element
const knightStyle = {
  fontSize: 30,          // Font size for the knight piece
  fontWeight: 'bold',    // Bold font weight
  cursor: 'move',        // Cursor style indicating the element is draggable
}

// Knight component representing the knight piece on the chessboard
// Knight component representing the knight piece on the chessboard
export const Knight = () => {
  // Setting up the drag source using the useDrag hook
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.KNIGHT,  // Type of the draggable item
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),  // Collecting the dragging state
      }),
    }),
    [],  // Dependency array (empty means no dependencies)
  )

  return (
    <>
      {/* DragPreviewImage for showing a custom drag preview */}
      <DragPreviewImage connect={preview} src={knightImage} key={new Date().getTime()} />
      <div
        ref={drag}  // Assigning the drag source ref to this div
        style={{
          ...knightStyle,  // Applying knightStyle
          opacity: isDragging ? 0.5 : 1,  // Changing opacity when dragging
        }}
      >
        {/* Image tag for the additional image */}
        <img src="butter.jpg" alt="butter" /> {/* 'dice.png' is the path to your image */}
      </div>
    </>
  )
}
