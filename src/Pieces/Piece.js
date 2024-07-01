// Importing the Knight component from the same directory
import { ItemTypes } from './ItemTypes.js';
import { BlueCarVisual } from './Cars/BlueCarVisual.js';
import { GreenCarVisual } from './Cars/GreenCarVisual.js';

// Piece component that conditionally renders different pieces based on props
export const Piece = ({type, id, roundManager }) => {
  if(type != '' || id != -1){
    const index = Number(id.slice(1));
    if (type === ItemTypes.GCAR && !roundManager.cars[index].complete) {
    return <GreenCarVisual id = {roundManager.cars[index]} roundManager = {roundManager} />;
    }
    if (type === ItemTypes.BCAR && !roundManager.cars[index].complete) {
      return <BlueCarVisual id = {roundManager.cars[index]} roundManager = {roundManager}/>
    }
  }
  return null; // Render nothing if no conditions are met
};

