
// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'

import { BlueCarVisual } from './BlueCarVisual.js';

export class BlueCar{
  constructor(id){
    this.type = ItemTypes.BCAR;
    this.id = id;
    this.coords = [0,0];
    this.complete = false;
    this.rResLimit = 3;
    this.yResLimit = 3;
    this.bResLimit = 2;
    this.rRes = 0
    this.yRes = 0;
    this.bRes = 0;
    this.waited = true;

  }

  
}
