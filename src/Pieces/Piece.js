// Importing the Knight component from the same directory
import { Knight } from './Knight.js'
import { BlueCar } from './BlueCarVisual.js'
import { GreenCar } from './GreenCarVisual.js'

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ isKnight, isGreenCar, isBlueCar }) => {
  if (isKnight) {
    return <Knight />;
  }
  if (isGreenCar) {
    return <GreenCar />;
  }
  if (isBlueCar) {
    return <BlueCar />;
  }
  return null; // Render nothing if no conditions are met
};