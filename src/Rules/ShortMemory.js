import {Car} from "../Pieces/Cars/Car"

export class ShortMemory{

    constructor(roundNum){
        
        this.cars = [];
        this.count = 0;
        this.produced = 0

        this.roundResources = [];
        this.conResources = [];
        this.endResources = [];

        this.roundNum = roundNum;
        this.paintRoundBegan = -1;
        this.paintStatus = false;
        this.dryStatus = false;
        this.readyToPaint = false;
    }



    setMemory( cars, count, produced, roundResources, conResources, roundNum, paintRoundBegan, paintStatus, dryStatus, readyToPaint){
        
        this.cars = [];

        for(let i = 0; i < cars.length; i++){
            this.cars.push(new Car(cars[i].id, null, cars[i].rRes, cars[i].yRes, cars[i].bRes, cars[i].waited, cars[i].complete, cars[i].coords[0], cars[i].coords[1]))
        }
        
        this.count = count;
        this.produced = produced;
        this.roundResources = [...roundResources];
        this.conResources = [...conResources];
        this.roundNum = roundNum;
        console.log("round Number incoming: " + roundNum)
        console.log("paint round began incoming " + paintRoundBegan)
        console.log("readyToPaint incoming" + readyToPaint)
        this.paintRoundBegan = paintRoundBegan;
        this.paintStatus = paintStatus;
        this.dryStatus = dryStatus;
        this.readyToPaint = readyToPaint

    }
    

    locationData(){
        /*
            0 = # of Manufacturing Blue
            1 = # of Manufacturing Green
            2 = # of Assembly Blue
            3 = # of Assembly Green
            4 = # of Quality Blue
            5 = # of Quality Green
            6 = # of Paint Blue
            7 = # of Paint Green
            8 = # of Dry Blue
            9 = # of Dry Green
            10 = # of Done Blue
            11 = # of Done Green

        */
        let data = [0,0,0,0,0,0,0,0,0,0,0,0]

        for(let i = 0; i < this.cars.length; i++){
            if(this.cars[i].id.charAt(0) === 'b'){
                if(this.cars[i].coords[0] == 1){
                    data[0] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[2] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[4] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[8] += 1;
                    }else{
                        data[6] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[10] += 1;
                }
            }else if(this.cars[i].id.charAt(0) === 'g'){
                if(this.cars[i].coords[0] == 1){
                    data[1] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[3] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[5] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[9] += 1;
                    }else{
                        data[7] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[11] += 1;
                }
            }
        }

        return data;

    }

}