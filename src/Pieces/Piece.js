// Importing the Knight component from the same directory
import { Knight } from './Knight.js'
import { BlueCarVisual } from './BlueCarVisual.js'
import { GreenCarVisual } from './GreenCarVisual.js'

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ isKnight, isGreenCar, isBlueCar }) => {
  if (isKnight) {
    return <Knight />;
  }
  if (isGreenCar) {
    return <GreenCarVisual />;
  }
  if (isBlueCar) {
    return <BlueCarVisual />;
  }
  return null; // Render nothing if no conditions are met
};