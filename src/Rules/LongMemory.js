import { ShortMemory } from "./ShortMemory";

export class LongMemory{
    constructor(totalRounds){
        this.storage = [];
        for(let i = 0; i < totalRounds; i++){
            this.storage.push( new ShortMemory(i) )
        }
    }

    commitPosition({roundManager}){
        console.log("In Commit Position")
        console.log(roundManager.shortMemory)

        this.storage[roundManager.roundNum].setMemory(roundManager.shortMemory.cars, roundManager.shortMemory.count
            , roundManager.shortMemory.produced, roundManager.shortMemory.roundResources
            , roundManager.shortMemory.conResources, roundManager.shortMemory.endResources
            , roundManager.shortMemory.roundNum, roundManager.shortMemory.paintRoundBegin
            , roundManager.shortMemory.paintStatus, roundManager.shortMemory.dryStatus
            , roundManager.shortMemory.readyToPaint
         )

    }

    commitResources({roundManager}){
        this.storage[roundManager.roundNum].roundResources = [...roundManager.shortMemory.roundResources]
        this.storage[roundManager.roundNum].conResources = [...roundManager.convertedResources]
        this.storage[roundManager.roundNum].endResources = [...roundManager.roundResources]

    }
}