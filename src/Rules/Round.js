import {TransitionDialog} from '../TransitionScreen/Transition'
import {Car} from '../Pieces/Cars/Car'

export class Round{

    constructor(id, totalRounds){

        //MACRO RESOURCES
        this.id = id;
        this.totalRounds = totalRounds;
        this.gameResources = [];
        for(let i = 0; i < totalRounds; i++){
            const red = parseInt(Math.random() * 10 + 1)
            const yellow = parseInt(Math.random() * 8 + 1)
            const blue = parseInt(Math.random() * 4 + 1)
            this.gameResources.push([red, yellow, blue]);
        }

        //CONTROL RESOURCES

        this.cars = [];
        this.count = 0;
        this.produced = 0
        this.observers = [];

        this.cars.push(new Car(0));
        this.cars.push(new Car(0));

        //MICRO RESOURCES
        this.roundResources = this.gameResources[0];
        this.roundNum = 0;
        this.paintRoundBegan = -1;
        this.paintStatus = false;
        this.dryStatus = false;
        this.readyToPaint = false;
    }

    getResources(roundNum){
        return this.gameResources[roundNum];
    }

    setRoundNum(num){
        this.roundNum = num;
    }

    callTransition(){
        console.log("reached")
       // return(<TransitionDialog/>)
    }

    allocateResources(){
        //Blue Resources:
            for(let i = 0; i < 8; i++){
                let id = this.carManager.findBlueId(3, i, this.carManager.blueCars)
                if(id != -1){
                    const limit = this.carManager.blueCars[id].bResLimit;
                    const res = this.carManager.blueCars[id].bRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[2];
                    if(availableRes >= need){
                        this.carManager.blueCars[id].bRes += need;
                        this.roundResources[2] -= need;
                    }else if(availableRes < need){
                        this.carManager.blueCars[id].bRes += availableRes;
                        this.roundResources[2] -= availableRes;
                    }
                }
                id = this.carManager.findGreenId(3, i, this.carManager.greenCars)
                if(id != -1){
                    const limit = this.carManager.greenCars[id].bResLimit;
                    const res = this.carManager.greenCars[id].bRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[2];
                    if(availableRes >= need){
                        this.carManager.greenCars[id].bRes += need;
                        this.roundResources[2] -= need;
                    }else if(availableRes < need){
                        this.carManager.greenCars[id].bRes += availableRes;
                        this.roundResources[2] -= availableRes;
                    }
                }
            }
        //Yellow
            for(let i = 0; i < 8; i++){
                let id = this.carManager.findBlueId(2, i, this.carManager.blueCars)
                if(id != -1){
                    const limit = this.carManager.blueCars[id].yResLimit;
                    const res = this.carManager.blueCars[id].yRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[1];
                    if(availableRes >= need){
                        this.carManager.blueCars[id].yRes += need;
                        this.roundResources[1] -= need;
                    }else if(availableRes < need){
                        this.carManager.blueCars[id].yRes += availableRes;
                        this.roundResources[1] -= availableRes;
                    }
                }
                id = this.carManager.findGreenId(2, i, this.carManager.greenCars)
                if(id != -1){
                    const limit = this.carManager.greenCars[id].yResLimit;
                    const res = this.carManager.greenCars[id].yRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[1];
                    if(availableRes >= need){
                        this.carManager.greenCars[id].yRes += need;
                        this.roundResources[1] -= need;
                    }else if(availableRes < need){
                        this.carManager.greenCars[id].yRes += availableRes;
                        this.roundResources[1] -= availableRes;
                    }
                }
            }

        //Red
            for(let i = 0; i < 8; i++){
                let id = this.carManager.findBlueId(1, i, this.carManager.blueCars)
                if(id != -1){
                    const limit = this.carManager.blueCars[id].rResLimit;
                    const res = this.carManager.blueCars[id].rRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[0];
                    if(availableRes >= need){
                        this.carManager.blueCars[id].rRes += need;
                        this.roundResources[0] -= need;
                    }else if(availableRes < need){
                        this.carManager.blueCars[id].rRes += availableRes;
                        this.roundResources[0] -= availableRes;
                    }
                }
                id = this.carManager.findGreenId(1, i, this.carManager.greenCars)
                if(id != -1){
                    const limit = this.carManager.greenCars[id].rResLimit;
                    const res = this.carManager.greenCars[id].rRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[0];
                    if(availableRes >= need){
                        this.carManager.greenCars[id].rRes += need;
                        this.roundResources[0] -= need;
                    }else if(availableRes < need){
                        this.carManager.greenCars[id].rRes += availableRes;
                        this.roundResources[0] -= availableRes;
                    }
                }
            }
    }

    completeStepMove(isBlue, id){
        if(isBlue){
            const [x, y] = this.carManager.blueCars[id].coords
            if(x == 1){
                if(this.carManager.blueCars[id].rRes == this.carManager.blueCars[id].rResLimit){
                    this.carManager.blueCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }
            }else if(x == 2){
                if(this.carManager.blueCars[id].yRes == this.carManager.blueCars[id].yResLimit){
                    this.carManager.blueCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }
            }else if(x == 3){
                if(this.carManager.blueCars[id].bRes == this.carManager.blueCars[id].bResLimit){
                    this.carManager.blueCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }

            }else if(x == 4){
                console.log("paint status: " + this.paintStatus)
                console.log("dry status: " + this.dryStatus)
                console.log("paint round begin status: " + this.roundNum + " " + this.paintRoundBegan + " " + (this.roundNum - 1 == this.paintRoundBegan))
                if(this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan){
                    this.carManager.blueCars[id].waited = true;
                }else if(this.paintRoundBegan == -1){
                    this.readyToPaint = true;
                }
            }
        }else{
            const [x, y] = this.carManager.greenCars[id].coords
            if(x == 1){
                if(this.carManager.greenCars[id].rRes == this.carManager.greenCars[id].rResLimit){
                    this.carManager.greenCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }
            }else if(x == 2){
                if(this.carManager.greenCars[id].yRes == this.carManager.greenCars[id].yResLimit){
                    this.carManager.greenCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }
            }else if(x == 3){
                if(this.carManager.greenCars[id].bRes == this.carManager.greenCars[id].bResLimit){
                    this.carManager.greenCars[id].waited = true;
                    //stop gap = add glow when ready to move over.
                }

            }else if(x == 4){
                if(this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan){
                    this.carManager.greenCars[id].waited = true;
                }else if(this.paintRoundBegan == -1){
                    this.readyToPaint = true;
                }
            }
        }

    }

    advanceRound(){
        console.log(this.roundNum + " " + this.paintRoundBegan)
        if(this.paintStatus && this.roundNum - 1 == this.paintRoundBegan){
            this.dryStatus = true;
            this.readyToPaint = false;
        }

        


        for(let i = 0; i < this.carManager.blueCars.length; i++){
            this.completeStepMove(true, i)
        }
        for(let i = 0; i < this.carManager.greenCars.length; i++){
            this.completeStepMove(false, i)
        }

        if(this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan){
            this.paintStatus = false;
            this.dryStatus = false;
            this.paintRoundBegan = -1;
        }

        if(this.readyToPaint){
            this.paintStatus = true;
            this.paintRoundBegan = this.roundNum;
        }



        this.roundNum ++;
        this.roundResources = this.gameResources[this.roundNum]

        
        this.carManager.emitChange();
    }

    checkPaintStatus(x,y){
        if(x == 4){
            let count = 0;
            for(let i = 0; i < this.carManager.blueCars.length; i++){
                if(this.carManager.blueCars[i].coords[0] == 4){
                    count ++;
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


    deleteCar(id){
        this.cars[Number(id.slice(1))].complete = true;
        this.emitChange()
    }

    moveCar(toX, toY, id) {
        const index = Number(id.slice(1));

        if(toX == 5){
            this.deleteCar(id)
            this.cars[index].coords = [6, 0];
        }else if (id.charAt(0) === 'b' && this.cars[index].coords[0] == 0 && this.cars[index].coords[1] == 0) {
                this.cars[index].coords = [toX, toY];
                this.cars.push(new Car("b" + this.cars.length))   
        } else if (id.charAt(0) === 'g' && this.cars[index].coords[0] == 0 && this.greenCars[index].coords[1] == 1){
                this.cars[index].coords = [toX, toY];
                this.cars.push(new Car("g" + this.cars.length))
        }else{
            this.cars[index].coords = [toX, toY];
        }
        this.cars[index].waited = false;
        this.emitChange();
    }


    checkMoveReqs(toX, toY, car){
        if(car != null){
            const [x, y] = car.coords;
            if(x == 0){
                return true;
            }else if(x == 1){
                if(car.rRes == car.rResLimit && car.waited){
                    return true;
                }
            }else if(x == 2){
                if(car.yRes == car.yResLimit && car.waited){
                    return true;
                }
            }else if(x == 3){
                if(car.bRes == car.bResLimit && car.waited){
                    return true;
                }
            }else if(x == 4){
                if(car.waited){
                    return true;
                }
            }
            
        }
            
        }
    }

    

    canMoveCar(toX, toY, id, isBlue, bCars, gCars) {
        const index = Number(id.slice(1));
        
        const [x, y] = cars[index].coords;
        let moveReqs = this.checkMoveReqs(toX, toY, cars[index])

        const dx = toX - x;
        const dy = toY - y;
        return (((dx === 1 && moveReqs) || (dx === 0 && Math.abs(dy) > 0)) && (!this.hasCar(toX, toY, cars)));
    }


    emitChange() {
        const updateCars = this.cars; // Shallow copy to avoid mutation
        this.observers.forEach(observer => observer && observer({
            updateCars
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