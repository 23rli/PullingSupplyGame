// Importing the Knight component from the same directory
import { Knight } from './Knight.js'
import { BlueCarVisual } from './BlueCarVisual.js'
import { GreenCarVisual } from './GreenCarVisual.js'
import { ItemTypes } from './ItemTypes.js';

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ isKnight, isGreenCar, isBlueCar }) => {
  if (isKnight) {
    return <Knight id = {ItemTypes.KNIGHT}/>;
  }
  if (isGreenCar) {
    return <GreenCarVisual id = {ItemTypes.GCAR} />;
  }
  if (isBlueCar) {
    return <BlueCarVisual id = {ItemTypes.BCAR} />;
  }
  return null; // Render nothing if no conditions are met
};