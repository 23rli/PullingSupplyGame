import { ShortMemory } from "./ShortMemory";


export class LongMemory {
    constructor() {
        this.storage = [];
        this.round = 0;
        this.storage.push(new ShortMemory(this.round));
    }
    

    commitPosition({ roundManager }) {
        console.log("In Commit Position");
        console.log("roundManager:", roundManager);
        console.log("roundManager.shortMemory:", roundManager.shortMemory);
        console.log("roundManager.roundNum:", roundManager.roundNum);

        if(this.round < roundManager.roundNum){
            this.storage.push(new ShortMemory(roundManager.roundNum))
            this.round ++;
        }

        const {
            cars,
            count,
            produced,
            roundResources,
            conResources,
            endResources,
            paintRoundBegan,
            paintStatus,
            dryStatus,
            readyToPaint,
        } = roundManager.shortMemory;

        const { roundNum } = roundManager;

        if (typeof roundNum === 'undefined' || !roundManager.shortMemory) {
            console.error("roundManager.shortMemory or roundManager.roundNum is undefined");
            return;
        }

        console.log("Values being passed to setMemory:");
        console.log({
            cars,
            count,
            produced,
            roundResources,
            conResources,
            roundNum,
            paintRoundBegan,
            paintStatus,
            dryStatus,
            readyToPaint,
        });

        this.storage[roundNum].setMemory(
            cars,
            count,
            produced,
            roundResources,
            conResources,
            roundNum,
            paintRoundBegan,
            paintStatus,
            dryStatus,
            readyToPaint
        );
    }

    commitResources({ roundManager }) {
        const { roundNum, gameResources, convertedResources, roundResources } = roundManager;

        if(this.round < roundManager.roundNum){
            this.storage.push(new ShortMemory(roundManager.roundNum))
            this.round ++;
        }

        if (typeof roundNum === 'undefined' || !gameResources || !convertedResources || !roundResources) {
            console.error("One or more properties are undefined in roundManager");
            return;
        }

        this.storage[roundNum].roundResources = [...gameResources[roundNum]];
        this.storage[roundNum].conResources = [...convertedResources];
        this.storage[roundNum].endResources = [...roundResources];
    }
}
