
// Importing ItemTypes constant from the same directory
import {react} from 'react'
import { ItemTypes } from '../ItemTypes.js'

import { GreenCarVisual } from '../GreenCar/GreenCarVisual.js';

export class GreenCar{
  constructor(id){
    this.type = ItemTypes.GCar;
    this.id = id;
    this.coords = [0,3];
  }

  
}