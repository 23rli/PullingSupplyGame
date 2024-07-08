import { ShortMemory } from "./ShortMemory";

export class LongMemory{
    constructor(totalRounds){
        this.storage = [];
        for(let i = 0; i < totalRounds; i++){
            this.storage.push( new ShortMemory(i) )
        }
    }

    commit(shortMemory, roundNum){
        this.storage[roundNum].setMemory(shortMemory.cars, shortMemory.count
            ,shortMemory.produced, shortMemory.roundResources
            ,shortMemory.roundNum, shortMemory.paintRoundBegin
            ,shortMemory.paintStatus, shortMemory.dryStatus
            ,shortMemory.readyToPaint
         )

    }
}