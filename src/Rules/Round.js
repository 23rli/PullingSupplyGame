import { Car } from '../Pieces/Cars/Car.js'
import { ShortMemory } from './ShortMemory.js';

export class Round {

    constructor(id) {

        //MACRO RESOURCES
        this.gameId = id;
        this.userId = 0;
        this.gameResources = [[0,0,0]];

        //Memory:

        this.shortMemory = new ShortMemory(0);

        //CONTROL RESOURCES

        this.cars = [];
        this.count = 0;
        this.produced = 0;
        this.observers = [];
        
        this.startB = -1;
        this.startG = -1;
        this.startR = -1;
        this.startY = -1;

        this.revenueB = 0;
        this.revenueG = 0;
        this.revenueR = 0;
        this.revenueY = 0;

        //MICRO RESOURCES
        this.roundResources = [...this.gameResources[0]]
        this.convertedResources = [...this.gameResources[0]]
        this.roundNum = 0;
        this.paintRoundBegan = -1;
        this.paintStatus = false;
        this.dryStatus = false;
        this.readyToPaint = false;

        this.setShortTermMem()
        console.log("round constructor")
        console.log(this.shortMemory)

        this.errorStatement = "";
        this.errorDisplayed = false;

        this.endGame = false;
    }

    setRevenue(blueRev, greenRev, redRev, yellowRev){
        if(blueRev != null) this.revenueB = blueRev;
        if(greenRev != null) this.revenueG = greenRev;
        if(redRev != null) this.revenueR = redRev;
        if(yellowRev != null) this.revenueY = yellowRev;
    }

    setCars(blueCar, greenCar, redCar, yellowCar){
        let count = 0;
        if(blueCar === 1){
            this.cars.push(new Car('b' + count, count, null));
            this.startB = count;
            count++;
        }
        if(greenCar === 1){
            this.cars.push(new Car('g' + count, count, null));
            this.startG = count;
            count++;
        }
        if(redCar === 1){
            this.cars.push(new Car('r' + count, count, null));
            this.startR = count;
            count++;
            console.log(this.cars)
        }
        if(yellowCar === 1){
            this.cars.push(new Car('y' + count, count, null));
            this.startY = count;
            count++;
            console.log(this.cars)
        }

    }

    setGameResources(rolls){
        const rollArray = rolls.split(",")
        this.gameResources.pop();
        for(let i = 0; i < rollArray.length/3 - 2; i++){
            this.gameResources.push([Number([rollArray[i * 3]]), Number(rollArray[i * 3 + 1]), Number(rollArray[i * 3 + 2])])
        }
        this.roundResources = [...this.gameResources[0]]
        this.convertedResources = [...this.gameResources[0]]
    }




    resetRound() {

        this.cars = [];

        for (let i = 0; i < this.shortMemory.cars.length; i++) {
            const temp = this.shortMemory.cars[i]
            this.cars.push(new Car(temp.id, null, temp.rRes, temp.yRes, temp.bRes, temp.waited, temp.complete, temp.coords[0], temp.coords[1]))
        }

        this.count = this.shortMemory.count;
        this.produced = this.shortMemory.produced;

        //MICRO RESOURCES
        this.roundResources = [...this.shortMemory.roundResources];
        this.convertedResources = [...this.shortMemory.roundResources];
        this.roundNum = this.shortMemory.roundNum;
        this.paintRoundBegan = this.shortMemory.paintRoundBegan;
        this.paintStatus = this.shortMemory.paintStatus;
        this.dryStatus = this.shortMemory.dryStatus;
        this.readyToPaint = this.shortMemory.readyToPaint;


        this.emitChange();
    }

    setRoundNum(num) {
        this.roundNum = num;
    }



    allocateResources() {
        //Blue Resources:
        for (let i = 0; i < 8; i++) {
            let id = this.findId(3, i, this.cars)
            if (id != -1) {
                let index = id.slice(1);
                const limit = this.cars[index].bResLimit;
                const res = this.cars[index].bRes;
                const need = limit - res;
                console.log(need)
                console.log(limit)
                console.log(res)
                let availableRes = this.roundResources[2];
                if (availableRes >= need) {
                    this.cars[index].bRes += need;
                    this.roundResources[2] -= need;
                } else if (availableRes < need) {
                    this.cars[index].bRes += availableRes;
                    this.roundResources[2] -= availableRes;
                }
            }
        }
        //Yellow
        for (let i = 0; i < 8; i++) {
            let id = this.findId(2, i, this.cars)
            if (id != -1) {
                let index = id.slice(1);
                const limit = this.cars[index].yResLimit;
                const res = this.cars[index].yRes;
                const need = limit - res;
                let availableRes = this.roundResources[1];
                if (availableRes >= need) {
                    this.cars[index].yRes += need;
                    this.roundResources[1] -= need;
                } else if (availableRes < need) {
                    this.cars[index].yRes += availableRes;
                    this.roundResources[1] -= availableRes;
                }
            }

        }

        //Red
        for (let i = 0; i < 8; i++) {
            let id = this.findId(1, i, this.cars)
            if (id != -1) {
                let index = id.slice(1);
                const limit = this.cars[index].rResLimit;
                const res = this.cars[index].rRes;
                const need = limit - res;
                let availableRes = this.roundResources[0];
                if (availableRes >= need) {
                    this.cars[index].rRes += need;
                    this.roundResources[0] -= need;
                } else if (availableRes < need) {
                    this.cars[index].rRes += availableRes;
                    this.roundResources[0] -= availableRes;
                }
            }
        }

        this.emitChange();
        console.log(this.shortMemory)
    }

    completeStepMove(id) {
        const index = id.slice(1)
        const [x, y] = this.cars[index].coords
        if (x == 1) {
            if (this.cars[index].rRes == this.cars[index].rResLimit) {
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }
        } else if (x == 2) {
            if (this.cars[index].yRes == this.cars[index].yResLimit) {
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }
        } else if (x == 3) {
            if (this.cars[index].bRes == this.cars[index].bResLimit) {
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }

        } else if (x == 4) {
            if (this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan) {
                this.cars[index].waited = true;
            } else if (this.paintRoundBegan == -1) {
                this.readyToPaint = true;
            }
        }

    }

    advanceRound() {
        if (this.paintStatus && this.roundNum - 1 == this.paintRoundBegan) {
            this.dryStatus = true;
            this.readyToPaint = false;
        }

        for (let i = 0; i < this.cars.length; i++) {
            this.completeStepMove(this.cars[i].id)
        }

        if (this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan) {
            this.paintStatus = false;
            this.dryStatus = false;
            this.paintRoundBegan = -1;
        }

        if (this.readyToPaint) {
            this.paintStatus = true;
            this.paintRoundBegan = this.roundNum;
        }

        //updateStatistics();

        if (!this.endGame) {
            this.roundNum++;
            this.roundResources = [...this.gameResources[this.roundNum]]
            this.convertedResources = [...this.gameResources[this.roundNum]]
            this.setShortTermMem()

        } else {
            this.endGame = true;
        }


        this.emitChange();
    }

    checkPaintStatus(x, y) {
        if (x == 4) {
            let count = 0;
            for (let i = 0; i < this.cars.length; i++) {
                if (this.cars[i].coords[0] == 4) {
                    count++;
                }
            }

            return !this.readyToPaint && !(count >= 3);
        }
        return true;

    }

    observe(observer) {
        this.observers.push(observer);
        this.emitChange();
        console.log(" CM Observer has passed");
        return () => {
            this.observers = this.observers.filter(o => o !== observer);
        };
    }


    deleteCar(id) {
        this.cars[Number(id.slice(1))].complete = true;
        this.emitChange()
    }

    moveCar(toX, toY, id) {
        const index = Number(id.slice(1));

        if (toX == 5) {
            this.deleteCar(id)
            this.cars[index].coords = [6, 0];
        } else if (id.charAt(0) === 'b' && this.cars[index].coords[0] == 0 && this.cars[index].coords[1] == this.startB) {
            this.cars[index].coords = [toX, toY];
            this.cars.push(new Car("b" + this.cars.length, this.startB, null))
        } else if (id.charAt(0) === 'g' && this.cars[index].coords[0] == 0 && this.cars[index].coords[1] == this.startG) {
            this.cars[index].coords = [toX, toY];
            this.cars.push(new Car("g" + this.cars.length, this.startG, null))
        }else if (id.charAt(0) === 'r' && this.cars[index].coords[0] == 0 && this.cars[index].coords[1] == this.startR) {
            this.cars[index].coords = [toX, toY];
            this.cars.push(new Car("r" + this.cars.length, this.startR, null))
        }else if (id.charAt(0) === 'y' && this.cars[index].coords[0] == 0 && this.cars[index].coords[1] == this.startY) {
            this.cars[index].coords = [toX, toY];
            this.cars.push(new Car("y" + this.cars.length, this.startY, null))
        } else {
            this.cars[index].coords = [toX, toY];
        }
        this.cars[index].waited = false;

        console.log(this.shortMemory)
        this.emitChange();
    }


    checkMoveReqs(toX, toY, car) {
        if (car != null) {
            const [x, y] = car.coords;
            if (x == 0) {
                return true;
            }
            if(car.rRes < car.rResLimit && x == 1){
                this.errorStatement = "This Car doesn't have enough red resources";
                return false;
            }else if(car.yRes < car.yResLimit && x == 2 ){
                this.errorStatement = "This Car doesn't have enough yellow resources";
                return false;
            }else if(car.bRes < car.bResLimit && x == 3){
                this.errorStatement = "This Car doesn't have enough blue resources";
                return false;
            }else if(!car.waited){
                 this.errorStatement = "This Car hasn't waited the proper amount of turns!"
                return false;
            }

            return true;
        }
        return false;

    }




    canMoveCar(toX, toY, id, cars) {
        const index = Number(id.slice(1));

        const [x, y] = cars[index].coords;
        let moveReqs = this.checkMoveReqs(toX, toY, cars[index])
        const dx = toX - x;
        const dy = toY - y;
        if(dx !== 0){
            if (dx === 1 && moveReqs) {
                if (!this.hasCar(toX, toY, cars, index)) {
                    this.errorStatement = '';
                    return true;
                }
            }
        }
        return false;
    }

    movementError() {
        return this.errorStatement;
    }


    emitChange() {
        const updateCars = this.cars; // Shallow copy to avoid mutation
        this.observers.forEach(observer => observer && observer({
            updateCars
        }));
    }


    hasCar(x, y, cars, index) {
        for (let i = 2; i < cars.length; i++) {
            if (cars[i].coords[0] === x && cars[i].coords[1] === y && index != i + 1){
                console.log(index + " " + i)
                return true;
            }
        }
        return false;
    }


    /*The code can;t seem to find the id via x and y when dragging the object */
    findId(x, y, cars) {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].coords[0] === x && cars[i].coords[1] === y) {
                return cars[i].id;
            }
        }
        return -1;
    }

    endGame() {
      
    }

    setShortTermMem() {
        console.log(this.convertedResources)
        console.log("setShortTermMem roundNum: " + this.roundNum)
        this.shortMemory.setMemory(this.cars, this.count, this.produced, this.roundResources
            , this.convertedResources, this.roundNum, this.paintRoundBegan, this.paintStatus, this.dryStatus, this.readyToPaint);
        console.log("setShortTermMem completed")
        console.log(this.shortMemory)

    }


}