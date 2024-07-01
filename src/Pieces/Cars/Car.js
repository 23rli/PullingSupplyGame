
// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'


export class Car{
  constructor(id){
    this.id = id;
    this.rRes = 0
    this.yRes = 0;
    this.bRes = 0;
    this.waited = true;
    this.complete = false;

    this.coords = [0,1];
    this.rResLimit = 2;
    this.yResLimit = 2;
    this.bResLimit = 2;
    this.type = ItemTypes.GCAR;

    if(id.charAt(0) === 'b'){
        this.type = ItemTypes.BCAR;
        this.coords = [0,0];
        this.rResLimit = 3;
        this.yResLimit = 3;
        this.bResLimit = 2;
    }
  }

}