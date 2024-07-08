import {Car} from "../Pieces/Cars/Car"

export class ShortMemory{

    constructor(roundNum){
        this.cars = [];
        this.count = 0;
        this.produced = 0
        this.observers = [];

        this.roundResources = [];
        this.conResources = [];
        this.endResources = [];

        this.roundNum = roundNum;
        this.paintRoundBegan = -1;
        this.paintStatus = false;
        this.dryStatus = false;
        this.readyToPaint = false;
    }

    setMemory(cars, count, produced, roundResources,roundNum, paintRoundBegin, paintStatus, dryStatus, readyToPaint){
        this.cars = [];

        for(let i = 0; i < cars.length; i++){
            this.cars.push(new Car(cars[i].id, cars[i].rRes, cars[i].yRes, cars[i].bRes, cars[i].waited, cars[i].complete, cars[i].coords[0], cars[i].coords[1]))
        }
        
        this.count = count;
        this.produced = produced;
        this.roundResources = [...roundResources];
        this.roundNUm = roundNum;
        this.paintRoundBegin = paintRoundBegin;
        this.paintStatus = paintStatus;
        this.dryStatus = dryStatus;
        this.readyToPaint = readyToPaint

    }

    updateObjectStats(){
        

    }

    updateResourceStats(){

    }

    uploadToLong(){

    }

    observe(observer) {
        this.observers.push(observer);
        this.emitChange();
        console.log(" shortMemory Observer has passed");
        return () => {
            this.observers = this.observers.filter(o => o !== observer);
        };
    }

    emitChange() {
        const updateCars = this.cars; // Shallow copy to avoid mutation
        this.observers.forEach(observer => observer && observer({
            updateCars
        }));
    }


}