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

        this.cars.push(new Car('b0'));
        this.cars.push(new Car('g1'));

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
                let id = this.findId(3, i, this.cars)
                if(id != -1){
                    let index = id.slice(1);
                    const limit = this.cars[index].bResLimit;
                    const res = this.cars[index].bRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[2];
                    if(availableRes >= need){
                        this.cars[index].bRes += need;
                        this.roundResources[2] -= need;
                    }else if(availableRes < need){
                        this.cars[index].bRes += availableRes;
                        this.roundResources[2] -= availableRes;
                    }
                }
            }
        //Yellow
            for(let i = 0; i < 8; i++){
                let id = this.findId(2, i, this.cars)
                if(id != -1){
                    let index = id.slice(1);
                    const limit = this.cars[index].yResLimit;
                    const res = this.cars[index].yRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[1];
                    if(availableRes >= need){
                        this.cars[index].yRes += need;
                        this.roundResources[1] -= need;
                    }else if(availableRes < need){
                        this.cars[index].yRes += availableRes;
                        this.roundResources[1] -= availableRes;
                    }
                }

            }

        //Red
            for(let i = 0; i < 8; i++){
                let id = this.findId(1, i, this.cars)
                if(id != -1){
                    let index = id.slice(1);
                    const limit = this.cars[index].rResLimit;
                    const res = this.cars[index].rRes;
                    const need = limit - res;
                    let availableRes = this.roundResources[0];
                    if(availableRes >= need){
                        this.cars[index].rRes += need;
                        this.roundResources[0] -= need;
                    }else if(availableRes < need){
                        this.cars[index].rRes += availableRes;
                        this.roundResources[0] -= availableRes;
                    }
                }
            }
    }

    completeStepMove(id){
        const index = id.slice(1)
        const [x, y] = this.cars[index].coords
        if(x == 1){
            if(this.cars[index].rRes == this.cars[index].rResLimit){
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }
        }else if(x == 2){
            if(this.cars[index].yRes == this.cars[index].yResLimit){
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }
        }else if(x == 3){
            if(this.cars[index].bRes == this.cars[index].bResLimit){
                this.cars[index].waited = true;
                //stop gap = add glow when ready to move over.
            }

        }else if(x == 4){
            if(this.paintStatus && this.dryStatus && this.roundNum - 1 == this.paintRoundBegan){
                this.cars[index].waited = true;
            }else if(this.paintRoundBegan == -1){
                this.readyToPaint = true;
            }
        }

    }

    advanceRound(){
        if(this.paintStatus && this.roundNum - 1 == this.paintRoundBegan){
            this.dryStatus = true;
            this.readyToPaint = false;
        }

        for(let i = 0; i < this.cars.length; i++){
            this.completeStepMove(this.cars[i].id)
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
        
        this.emitChange();
    }

    checkPaintStatus(x,y){
        if(x == 4){
            let count = 0;
            for(let i = 0; i < this.cars.length; i++){
                if(this.cars[i].coords[0] == 4){
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
    

    

    canMoveCar(toX, toY, id, cars) {
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

   
    hasCar(x, y, cars) {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].coords[0] === x && cars[i].coords[1] === y )  {
                return true;
            }
        }
        return false;
    }


    /*The code can;t seem to find the id via x and y when dragging the object */
    findId(x, y, cars){
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].coords[0] === x && cars[i].coords[1] === y)  {
                return cars[i].id;
            }
        }
        return -1;
    }

    
}