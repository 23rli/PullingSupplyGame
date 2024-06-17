
// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'

import { GreenCarVisual } from '../GreenCar/GreenCarVisual.js';

export class GreenCar{
  constructor(id){
    this.type = ItemTypes.BCAR;
    this.id = id;
    this.coords = [0,3];
    this.visual = GreenCarVisual(id);
  }

  
}