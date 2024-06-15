/*
SO this is the plan.
Make 15 Blue cars and 15 green cars with the same functionality as Knight
Have them all located at 0,1 or 0,2
Then have it so when a user drags a vehicle, its only draggable if the units before it haven't been dragged
This progresses until the unit dragged finishes. It then makes some changes and teleports back to the first block to repeat the cycle.
*/

import { BlueCarVisual } from "./BlueCarVisual"

import { GreenCarVisual } from "./GreenCarVisual";
// CarManager.js

export class CarManager {
    constructor() {
        this.greenCarsCoords = Array(15).fill([0, 3]);
        this.blueCarsCoords = Array(15).fill([0, 2]);
        this.blueStats = [];
        this.greenStats = [];
        this.count = 0;
        this.produced = 0;
        this.blueVisuals = BlueCarVisual;
        this.greenVisuals = GreenCarVisual;
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
        if (isBlue) {
            this.blueCarsCoords[id] = [toX, toY];
        } else {
            this.greenCarsCoords[id] = [toX, toY];
        }
        this.emitChange();
    }

    canMoveCar(toX, toY, id, isBlue) {
        const [x, y] = isBlue ? this.blueCarsCoords[id] : this.greenCarsCoords[id];
        const dx = toX - x;
        const dy = toY - y;
        return (dx === 1) || (dx === 0 && Math.abs(dy) > 0);
    }

    emitChange() {
        this.observers.forEach(o => o && o({
            blueCarsCoords: this.blueCarsCoords,
            greenCarsCoords: this.greenCarsCoords
        }));
    }

    hasBlueCar(x, y) {
        for (let i = 0; i < this.blueCarsCoords.length; i++) {
            if (this.blueCarsCoords[i][0] === x && this.blueCarsCoords[i][1] === y)  {
                return true;
            }
        }
        return false;
    }

    hasGreenCar(x,y){
        for (let i = 0; i < this.blueCarsCoords.length; i++) {
            if ((this.greenCarsCoords[i][0] === x && this.greenCarsCoords[i][1] === y)) {
                return true;
            }
        }
        return false;
    }
}
