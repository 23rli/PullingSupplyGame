// Importing the necessary components
import { ItemTypes } from './ItemTypes.js';
import { BlueCarVisual } from './Cars/BlueCarVisual.js';
import { GreenCarVisual } from './Cars/GreenCarVisual.js';
import blueCar from './Cars/blueCar.png'
import blueCarRed1 from './Cars/Motor City Graphics/Model B - red 1.png'
import blueCarRed2 from './Cars/Motor City Graphics/Model B - red 2.png'
import blueCarRed3 from './Cars/Motor City Graphics/Model B - red 3.png'
import blueCarYellow1 from './Cars/Motor City Graphics/Model B - yellow 1.png'
import blueCarYellow2 from './Cars/Motor City Graphics/Model B - yellow 2.png'
import blueCarYellow3 from './Cars/Motor City Graphics/Model B - yellow 3.png'
import blueCarBlue1 from './Cars/Motor City Graphics/Model B - blue 1.png'
import blueCarBlue2 from './Cars/Motor City Graphics/Model B - blue 2.png'
import blueCarBlue3 from './Cars/Motor City Graphics/Model B - blue 3.png'
import greenCarRed1 from './Cars/Motor City Graphics/Model G - red 1.png'
import greenCarRed2 from './Cars/Motor City Graphics/Model G - red 2.png'
import greenCarYellow1 from './Cars/Motor City Graphics/Model G - yellow 1.png'
import greenCarYellow2 from './Cars/Motor City Graphics/Model G - yellow 2.png'
import greenCarBlue1 from './Cars/Motor City Graphics/Model G - blue 1.png'
import greenCarBlue2 from './Cars/Motor City Graphics/Model G - blue 2.png'

// Piece component that conditionally renders different pieces based on props
export const Piece = ({ type, id, roundManager }) => {
  if (type !== '' && id !== -1) {
    const index = Number(id.slice(1));
    let image = blueCarRed1;

    if (type === ItemTypes.GCAR && !roundManager.cars[index].complete) {
      if(roundManager.cars[index].coords[0] == 1){
          if(roundManager.cars[index].rRes == 2){
            image = greenCarRed2;
          }else if(roundManager.cars[index].rRes == 1){
            image = greenCarRed1;
          }else{
            image = greenCarRed1;
          }
      }else if(roundManager.cars[index].coords[0] == 2){
          if(roundManager.cars[index].yRes == 2){
            image = greenCarYellow2;
          }else if(roundManager.cars[index].yRes == 1){
            image = greenCarYellow1;
          }else{
            image = greenCarRed2;
          }
      }else if(roundManager.cars[index].coords[0] == 3){
          if(roundManager.cars[index].bRes == 2){
            image = greenCarBlue2;
          }else if(roundManager.cars[index].bRes == 1){
            image = greenCarBlue1;
          }else{
            image = greenCarYellow2;
          }
      }else{
        image = greenCarRed1;
      }
    }
    if (type === ItemTypes.BCAR && !roundManager.cars[index].complete) {
      if(roundManager.cars[index].coords[0] == 1){
        if(roundManager.cars[index].rRes == 3){
          image = blueCarRed3;
        }else if(roundManager.cars[index].rRes == 2){
          image = blueCarRed2;
        }else if(roundManager.cars[index].rRes == 1){
          image = blueCarRed1;
        }else{
          image = blueCarRed1;
        }
      }else if(roundManager.cars[index].coords[0] == 2){
        if(roundManager.cars[index].yRes == 3){
          image = blueCarYellow3;
        }else if(roundManager.cars[index].yRes == 2){
          image = blueCarYellow2;
        }else if(roundManager.cars[index].yRes == 1){
          image = blueCarYellow1;
        }else{
          image = blueCarRed3;
        }
      }else if(roundManager.cars[index].coords[0] == 3){
        if(roundManager.cars[index].bRes == 3){
          image = blueCarBlue3;
        }else if(roundManager.cars[index].bRes == 2){
          image = blueCarBlue2;
        }else if(roundManager.cars[index].bRes == 1){
          image = blueCarBlue1;
        }else{
          image = blueCarYellow3;
        }
      }else{
        image = blueCarRed1;
      }
    }


    if (type === ItemTypes.GCAR && !roundManager.cars[index].complete) {
      return <GreenCarVisual id={roundManager.cars[index]} roundManager={roundManager} imageURL = {image} />;
    }
    if (type === ItemTypes.BCAR && !roundManager.cars[index].complete) {
      return <BlueCarVisual id={roundManager.cars[index]} roundManager={roundManager} imageURL = {image} />;
    }
  }
  return null; // Render nothing if no conditions are met
};
