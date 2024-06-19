// Importing the Knight component from the same directory
import { Knight } from './Knight.js'
import { ItemTypes } from './ItemTypes.js';
import { BlueCarVisual } from './BlueCar/BlueCarVisual.js';
import { GreenCarVisual } from './GreenCar/GreenCarVisual.js';

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ isKnight, type, id, carManager }) => {
  //console.log(id + " " + isKnight)
  if (isKnight) {
    return <Knight id = {ItemTypes.KNIGHT}/>;
  }
  if (type === ItemTypes.GCAR) {
   return <GreenCarVisual id = {carManager.greenCars[id]} carManager = {carManager} />;
  }
  if (type === ItemTypes.BCAR) {
    {console.log(carManager.blueCars[id])}
    return <BlueCarVisual id = {carManager.blueCars[id]} carManager = {carManager}/>
  }
  return null; // Render nothing if no conditions are met
};

