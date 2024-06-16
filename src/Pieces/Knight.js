// Importing necessary hooks and components from react-dnd library
import { DragPreviewImage, useDrag } from 'react-dnd'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from './ItemTypes.js'

// Importing knightImage for the drag preview
import { knightImage } from './knightImage.js'

// Knight component representing the knight piece on the chessboard

export const Knight = ({id}) => {
  // Setting up the drag source using the useDrag hook
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.KNIGHT,  // Type of the draggable item
      item: {id},
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
      <img
        ref={drag}
        src = {require("./butter.jpg")}
        alt = "failure"
        width = "150px"
        style={{ 
          border: isDragging ? "5px solid pink" : "0px",
          opacity: isDragging ? 0.5 : 1,  // Changing opacity when dragging 
        }}
      />
      {/*
      <div
        ref={drag}  // Assigning the drag source ref to this div
        style={{
          ...knightStyle,  // Applying knightStyle
          opacity: isDragging ? 0.5 : 1,  // Changing opacity when dragging
        }}
      >
        
        <img src="/path/to/butter.jpg" alt="butter" /> 
      </div>
      */}
    </>
  )
}


function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={url}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;