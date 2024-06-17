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
    constructor() {
        this.greenCars = [];
        for(let i = 0; i < 15; i++){
            this.greenCars.push(new GreenCar(i));
        }
        this.blueCars = [];
        for(let i = 0; i < 15; i++){
            this.blueCars.push(new BlueCar(i));
        }
        this.count = 0;
        this.produced = 0;

        this.observers = [];
    }


    observe(o) {
        this.observers.push(o);
        this.emitChange();
        return () => {
            this.observers = this.observers.filter(t => t !== o);
        };
    }

    moveCar(toX, toY, id, isBlue) {
        console.log("arrived in moveCar")
        console.log(toX + " " + toY + " " + id + " " + isBlue)
        if (isBlue) {
            this.blueCars[id].coords = [toX, toY];
        } else {
            this.greenCarsCoords[id] = [toX, toY];
        }
        this.emitChange();
        console.log(this.blueCarsCoords[0])
        console.log(this.blueCarsCoords[1])
    }

    canMoveCar(toX, toY, id, isBlue) {
        console.log(id)
        const [x, y] = isBlue ? this.blueCars[id].coords : this.greenCars[id].coords;
        const dx = toX - x;
        const dy = toY - y;
        return ((dx === 1) || (dx === 0 && Math.abs(dy) > 0) && !this.hasBlueCar(toX, toY) && !this.hasGreenCar(toX, toY));
    }

    emitChange() {
        this.observers.forEach(o => o && o({
            blueCarsCoords: this.blueCarsCoords,
            greenCarsCoords: this.greenCarsCoords
        }));
    }

    hasBlueCar(x, y) {
        for (let i = 0; i < this.blueCars.length; i++) {
            if (this.blueCars[i].coords[0] === x && this.blueCars[i].coords[1] === y )  {
                console.log(this.blueCars[i].coords[0] === x && this.blueCars[i].coords[1] === y )
                return true;
            }
        }
        return false;
    }

    hasGreenCar(x,y){
        for (let i = 0; i < this.greenCars.length; i++) {
            if ((this.greenCars[i].coords[0] === x && this.greenCars[i].coords[1] === y)) {
                return true;
            }
        }
        return false;
    }

    /*The code can;t seem to find the id via x and y when dragging the object */
    findBlueId(x, y){
        for (let i = 0; i < this.blueCars.length; i++) {
            if (this.blueCars[i].coords[0] == x && this.blueCars[i].coords[1] == y)  {
                console.log(i)
                return i;
            }
        }
        return 14;
    }

    findGreenId(x, y){
        for (let i = 0; i < this.greenCars.length; i++) {
            if (this.greenCars[i].coords[0] == x && this.greenCars[i].coords[1] == y)  {
                console.log(i);
                return i;
            }
        }
        return 5;
    }
}
