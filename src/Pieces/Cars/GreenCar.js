
// Importing ItemTypes constant from the same directory
import {react} from 'react'
import { ItemTypes } from '../ItemTypes.js'

import { GreenCarVisual } from './GreenCarVisual.js';

export class GreenCar{
  constructor(id){
    this.type = ItemTypes.GCAR;
    this.id = id;
    this.coords = [0,1];
    this.complete = false;
    this.rResLimit = 3;
    this.yResLimit = 2;
    this.bResLimit = 2;
    this.rRes = 0
    this.yRes = 0;
    this.bRes = 0;
    this.waited = true;
  }

  
}