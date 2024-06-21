export class Round{

    constructor(id, totalRounds){
        this.roundNum = 0;
        this.totalRounds = totalRounds;
        this.gameResources = [];
        for(let i = 0; i < totalRounds; i++){
            const red = parseInt(Math.random() * 10 + 1)
            const yellow = parseInt(Math.random() * 8 + 1)
            const blue = parseInt(Math.random() * 4 + 1)
            this.gameResources.push([red, yellow, blue]);
        }
        this.roundResources = this.gameResources[0];
    }

    getResources(roundNum){
        return this.gameResources[roundNum];
    }
}