// Importing useDrop hook from react-dnd library
import { useDrop } from 'react-dnd'

// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../Pieces/ItemTypes.js'

// Importing Overlay component and OverlayType constant from the same directory
import { Overlay, OverlayType } from './Overlay.js'

// Importing Square component from the same directory
import { ColumnContainer } from './ColumnContainer.js'


//import {BlueCarInitializer} from '../Pieces/BlueCarInitializer.js'

// BoardSquare component that represents each square on the chessboard
export const ColumnGrid = ({ x, y, children, roundManager}) => {
  // Setting up the drop target for the knight using the useDrop hook
  const products = [ItemTypes.GCAR, ItemTypes.BCAR];

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: products,  // Accepts items of type KNIGHT, GCAR, and BCAR
      canDrop: (item) => {

        if (item.id.type === ItemTypes.BCAR) {
          return roundManager.canMoveCar(x, y, item.id.id, roundManager.cars) 
                  && roundManager.checkPaintStatus(x,y);
        } else if (item.id.type === ItemTypes.GCAR) {
          return roundManager.canMoveCar(x, y, item.id.id, roundManager.cars)
                  && roundManager.checkPaintStatus(x,y); 
        }
        return false;
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
    [roundManager],  // Dependency array containing game object
  )

  return (
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
      <ColumnContainer x = {x} y = {y} roundManager = {roundManager}>
        {children}
        
      </ColumnContainer>
      
      {/* Conditionally render different overlays based on drag and drop state */}
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  )
}
