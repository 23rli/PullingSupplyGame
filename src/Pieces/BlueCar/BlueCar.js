
// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'

import { BlueCarVisual } from './BlueCarVisual.js';

export class BlueCar{
  constructor(id){
    this.type = ItemTypes.BCAR;
    this.id = id;
    this.coords = [0,2];
    this.complete = false;
    this.x = 0;
    this.y = 0;
  }

  
}
