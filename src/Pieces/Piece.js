// Importing the Knight component from the same directory
import { ItemTypes } from './ItemTypes.js';
import { BlueCarVisual } from './BlueCar/BlueCarVisual.js';
import { GreenCarVisual } from './GreenCar/GreenCarVisual.js';

// Piece component that conditionally renders different pieces based on props
export const Piece = ({type, id, carManager }) => {
  if (type === ItemTypes.GCAR && !carManager.greenCars[id].complete) {
   return <GreenCarVisual id = {carManager.greenCars[id]} carManager = {carManager} />;
  }
  if (type === ItemTypes.BCAR && !carManager.blueCars[id].complete) {
    return <BlueCarVisual id = {carManager.blueCars[id]} carManager = {carManager}/>
  }
  return null; // Render nothing if no conditions are met
};

