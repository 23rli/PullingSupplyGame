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

    
}