import { ShortMemory } from "./ShortMemory";

export class LongMemory{
    constructor(totalRounds){
        this.storage = [];
        for(let i = 0; i < totalRounds; i++){
            this.storage.push( new ShortMemory(i))
        }
    }
}