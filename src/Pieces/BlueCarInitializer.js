import { BlueCarVisual } from "./BlueCarVisual"
import { BCarRules } from "../Rules/BCarRules"

export class BlueCars{
    cars;
    count;
    visuals;
    rules;

    constructor(BCarRules, BlueCarVisual){
        cars = [];
        count = 0;
        visuals = BlueCarVisual;
        rules = new BCarRules();
    }

    addCar(){
        cars.push([count,[rules.initalPosition[0],rules.initalPosition[1]]])
    }

    deleteCar(count){
        this.cars.splice(index, count);
    }

    checkLocation(x,y){
        for(let i = 0; i < this.cars.length; i++){
            if(cars[i][0] === x && cars[i][1] === y){
                return i;
            }
        }
        return -1;
    }
}