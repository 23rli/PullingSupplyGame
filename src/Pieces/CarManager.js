/*
SO this is the plan.
Make 15 Blue cars and 15 green cars with the same functionality as Knight
Have them all located at 0,1 or 0,2
Then have it so when a user drags a vehicle, its only draggable if the units before it haven't been dragged
This progresses until the unit dragged finishes. It then makes some changes and teleports back to the first block to repeat the cycle.
*/

import { BlueCar } from "./BlueCar/BlueCar"

import { GreenCar } from "./GreenCar/GreenCar";
// CarManager.js

export class CarManager {
    greenCars = [];
    blueCars = [];
    count = 0;
    produced = 0
    observers = [];

    constructor() {
        this.greenCars.push(new GreenCar(0));
        
        this.blueCars.push(new BlueCar(0));

        console.log(this.greenCars[0].type)
        console.log(this.blueCars[0].type)

    }

    observe(observer) {
        this.observers.push(observer);
        this.emitChange();
        console.log(" CM Observer has passed");
        return () => {
            this.observers = this.observers.filter(o => o !== observer);
        };
    }
    gravitateUp(x,y){
        let startY = y - 1;
        while(!(this.hasBlueCar(x, startY, this.blueCars) && this.hasGreenCar(x, startY, this.greenCars)) && y > 0){
            startY -= 1;
        }
        return startY;

    }

    deleteCar(isBlue, id){
        if(isBlue){
            this.blueCars[id].complete = true;
        }else{
            this.greenCars[id].complete = true;
        }
        console.log(this.blueCars)
        this.emitChange()
    }

    moveCar(toX, toY, id, isBlue) {

        if(toX == 5){
            this.deleteCar(isBlue, id)
            if(isBlue){
                this.blueCars[id].coords = [6, 0];
            }else{
                this.greenCars[id].coords = [6, 0];
            }
            console.log(this.blueCars)
        }else if (isBlue) {
            console.log(toX + " " + toY + " " + id + " " +isBlue + this.blueCars[id].coords)
            //toY = this.gravitateUp(toX, toY)
            if(this.blueCars[id].coords[0] == 0 && this.blueCars[id].coords[1] == 2){
                this.blueCars[id].coords = [toX, toY];
                console.log(this.blueCars.length)
                this.blueCars.push(new BlueCar(this.blueCars.length))
            }else{
                
                this.blueCars[id].coords = [toX, toY];
            }
        } else {
            console.log(toX + " " + toY + " " + id + " " +isBlue + this.greenCars[id].coords)
            if(this.greenCars[id].coords[0] == 0 && this.greenCars[id].coords[1] == 3){
                this.greenCars[id].coords = [toX, toY];
                console.log(this.greenCars.length)
                this.greenCars.push(new GreenCar(this.greenCars.length))
            }else{
                //toY = this.gravitateUp(toX, toY)
                this.greenCars[id].coords = [toX, toY];
            }
        }
        this.emitChange();
    }

    

    canMoveCar(toX, toY, id, isBlue, bCars, gCars) {
        //console.log(isBlue)
        
        const [x, y] = isBlue? bCars[id].coords : gCars[id].coords;
        const dx = toX - x;
        const dy = toY - y;
        return (((dx === 1) || (dx === 0 && Math.abs(dy) > 0)) && (!this.hasBlueCar(toX, toY, bCars)) && (!this.hasGreenCar(toX, toY, gCars)));
    }

    emitChange() {
        const updateBlueCars = this.blueCars; // Shallow copy to avoid mutation
        const updateGreenCars = this.greenCars; // Shallow copy to avoid mutation
        console.log(this.blueCars)
        this.observers.forEach(observer => observer && observer({
            updateBlueCars,
            updateGreenCars
        }));
    }

   
    hasBlueCar(x, y, blueCars) {
        for (let i = 0; i < blueCars.length; i++) {
            if (blueCars[i].coords[0] === x && blueCars[i].coords[1] === y )  {
                //console.log(this.blueCars[i].coords[0] === x && this.blueCars[i].coords[1] === y )
                return true;
            }
        }
        return false;
    }

    hasGreenCar(x,y, greenCars){
        for (let i = 0; i < greenCars.length; i++) {
            if ((greenCars[i].coords[0] === x && greenCars[i].coords[1] === y)) {
                return true;
            }
        }
        return false;
    }

    /*The code can;t seem to find the id via x and y when dragging the object */
    findBlueId(x, y, blueCars){
        for (let i = 0; i < blueCars.length; i++) {
            if (blueCars[i].coords[0] === x && blueCars[i].coords[1] === y)  {
                //console.log(i)
                return i;
            }
        }
        return -1;
    }

    findGreenId(x, y, greenCars){
        for (let i = 0; i < greenCars.length; i++) {
            if (greenCars[i].coords[0] === x && greenCars[i].coords[1] === y)  {
                //console.log(i);
                return i;
            }
        }
        return -1;
    }
}
