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
            2 = # of Manufacturing red
            3 = # of Manufacturing yellow
            4 = # of Assembly Blue
            5 = # of Assembly Green
            6 = # of Assembly red
            7 = # of Assembly yellow
            8 = # of Quality Blue
            9 = # of Quality Green
            10 = # of Quality red
            11 = # of Quality yellow
            12 = # of Paint Blue
            13 = # of Paint Green
            14 = # of Paint red
            15 = # of Paint yellow
            16 = # of Dry Blue
            17 = # of Dry Green
            18 = # of Dry red
            19 = # of Dry yellow
            20 = # of Done Blue
            21 = # of Done Green
            22 = # of Done red
            23 = # of Done yellow

        */
        let data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        for(let i = 0; i < this.cars.length; i++){
            if(this.cars[i].id.charAt(0) === 'b'){
                if(this.cars[i].coords[0] == 1){
                    data[0] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[4] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[8] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[16] += 1;
                    }else{
                        data[12] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[20] += 1;
                }
            }else if(this.cars[i].id.charAt(0) === 'g'){
                if(this.cars[i].coords[0] == 1){
                    data[1] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[5] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[9] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[17] += 1;
                    }else{
                        data[13] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[21] += 1;
                }
            }else if(this.cars[i].id.charAt(0) === 'r'){
                if(this.cars[i].coords[0] == 1){
                    data[2] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[6] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[10] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[18] += 1;
                    }else{
                        data[14] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[22] += 1;
                }
            }else if(this.cars[i].id.charAt(0) === 'y'){
                if(this.cars[i].coords[0] == 1){
                    data[3] += 1;
                }else if(this.cars[i].coords[0] == 2){
                    data[7] += 1;
                }else if(this.cars[i].coords[0] == 3){
                    data[11] += 1;
                }else if(this.cars[i].coords[0] == 4){
                    if(this.roundNum - 1 == this.paintRoundBegan){
                        data[19] += 1;
                    }else{
                        data[15] += 1;
                    }
                }else if(this.cars[i].coords[0] == 6){
                    data[23] += 1;
                }
            }
        }

        return data;

    }

}