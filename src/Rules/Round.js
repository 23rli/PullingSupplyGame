import {TransitionDialog} from '../TransitionScreen/Transition'

export class Round{

    constructor(id, totalRounds, carManager){

        //MACRO RESOURCES
        this.id = id;
        this.carManager = carManager;
        this.totalRounds = totalRounds;
        this.gameResources = [];
        for(let i = 0; i < totalRounds; i++){
            const red = parseInt(Math.random() * 10 + 1)
            const yellow = parseInt(Math.random() * 8 + 1)
            const blue = parseInt(Math.random() * 4 + 1)
            this.gameResources.push([red, yellow, blue]);
        }

        //MICRO RESOURCES
        this.roundResources = this.gameResources[0];
        this.roundNum = 0;
        this.paintStatus = false;
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

    completeStepMove(){

    }

    advanceRound(){
        this.roundNum ++;
    }

    
}