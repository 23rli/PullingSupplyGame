
// Importing ItemTypes constant from the same directory
import { ItemTypes } from '../ItemTypes.js'


export class Car{

  constructor(id, startY, rRes, yRes, bRes, waited, complete, x, y){

    this.id = id;
    this.startingCoords = [0,startY]

    if(rRes != null){
      this.rRes = rRes
      this.yRes = yRes;
      this.bRes = bRes;
      this.waited = waited;
      this.complete = complete;

      this.coords = [x,y];
      this.rResLimit = 2;
      this.yResLimit = 2;
      this.bResLimit = 2;
      this.type = ItemTypes.GCAR;

      if(id.charAt(0) === 'b'){
          this.type = ItemTypes.BCAR;
          this.rResLimit = 3;
          this.yResLimit = 3;
          this.bResLimit = 2;
      }
      if(id.charAt(0) === 'r'){
        this.type = ItemTypes.BCAR;
        this.rResLimit = 3;
        this.yResLimit = 2;
        this.bResLimit = 2;
      }
      if(id.charAt(0) === 'y'){
        this.type = ItemTypes.BCAR;
        this.rResLimit = 2;
        this.yResLimit = 3;
        this.bResLimit = 2;
      }
    }else{
      this.id = id;
      this.rRes = 0
      this.yRes = 0;
      this.bRes = 0;
      this.waited = true;
      this.complete = false;
  
      this.coords = this.startingCoords;
      this.rResLimit = 2;
      this.yResLimit = 2;
      this.bResLimit = 2;
      this.type = ItemTypes.GCAR;
  
      if(id.charAt(0) === 'b'){
          this.type = ItemTypes.BCAR;
          this.coords = [0,0];
          this.rResLimit = 3;
          this.yResLimit = 3;
          this.bResLimit = 3;
      }
      if(id.charAt(0) === 'r'){
        this.type = ItemTypes.BCAR;
        this.coords = [0,0];
        this.rResLimit = 3;
        this.yResLimit = 2;
        this.bResLimit = 2;
      }
      if(id.charAt(0) === 'y'){
        this.type = ItemTypes.BCAR;
        this.coords = [0,0];
        this.rResLimit = 2;
        this.yResLimit = 3;
        this.bResLimit = 2;
      }
    }
  }


}