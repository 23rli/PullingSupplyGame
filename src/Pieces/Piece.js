// Importing the Knight component from the same directory
import { Knight } from './Knight.js'
import { ItemTypes } from './ItemTypes.js';
import { BlueCarVisual } from './BlueCar/BlueCarVisual.js';
import { GreenCarVisual } from './GreenCar/GreenCarVisual.js';

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ isKnight, isGreenCar, isBlueCar, id, carManager }) => {
  if (isKnight) {
    return <Knight id = {ItemTypes.KNIGHT}/>;
  }
  if (isGreenCar && id != -1) {
   return <GreenCarVisual id = {carManager.greenCars[id]} />;
  }
  if (isBlueCar && id != -1) {
    return <BlueCarVisual id = {carManager.blueCars[id]}/>
  }
  return null; // Render nothing if no conditions are met
};

