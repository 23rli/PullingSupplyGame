export class ShortMemory{

    constructor(roundNum){
        this.cars = [];
        this.count = 0;
        this.produced = 0
        this.observers = [];

        this.roundResources = [];
        this.conResources = [];
        this.endResources = [];

        this.roundNum = roundNum;
        this.paintRoundBegan = -1;
        this.paintStatus = false;
        this.dryStatus = false;
        this.readyToPaint = false;
    }

    setMemory(cars, count, produced, roundResources,rounNum, paintRoundBegain, paintStatus, dryStatus, readyToPaint){

    }

    updateObjectStats(){

    }

    updateResourceStats(){

    }

    observe(observer) {
        this.observers.push(observer);
        this.emitChange();
        console.log(" CM Observer has passed");
        return () => {
            this.observers = this.observers.filter(o => o !== observer);
        };
    }

    emitChange() {
        const updateCars = this.cars; // Shallow copy to avoid mutation
        this.observers.forEach(observer => observer && observer({
            updateCars
        }));
    }


}