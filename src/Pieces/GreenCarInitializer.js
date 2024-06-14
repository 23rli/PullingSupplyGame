import { GreenCarVisual } from "./GreenCarVisual"
/*
export class GreenCars{

    constructor(){
        this.initialPosition = [0,2]
        this.cars = [[0,0,2]];
        this.count = 0;
        this.produced = 0;
        this.visuals = GreenCarVisual;
    }

    addCar(){
        this.cars.push()
        this.cars[this.count] = [this.count,0,2]
        this.count += 1;
    }

    deleteCar(count){
        this.cars.splice(count, 1);
        this.produced += 1;
    }


  
    // Array to store observers (callbacks) that will be notified of changes
    observers = []
  
    // Method to add an observer
    observe(o) {
      this.observers.push(o)  // Add the observer to the array
      this.emitChange()  // Emit the current state to the new observer
      console.log("Observer has passed");
      return () => {
        // Return a function to remove the observer
        this.observers = this.observers.filter((t) => t !== o)
      }
    }
  
    // Method to move the knight to a new position
    moveKnight(toX, toY) {
     // toY = gravitateUp(toX, toY);
      this.knightPosition = [toX, toY]  // Update the knight's position
      this.emitChange()  // Notify all observers of the change
    }
  
    gravitateUp(toX, toY){
      for(let i = 0; i < this.BlueCars.length; i++){
        if(this.BlueCars[i][0] === toX && this.BlueCars[i][1]){
  
        }
      }
    }
  
    // Method to check if the knight can move to a specified position
    canMoveKnight(toX, toY, id) {
      const [x, y] = this.knightPosition  // Current position of the knight
      const dx = toX - x  // Change in the x-coordinate
      const dy = toY - y  // Change in the y-coordinate
      // Return true if the move is valid for a knight (L-shaped move)
      return (
        (dx === 1 ) || (dx === 0 && Math.abs(dy) > 0)
        
      )
    }
  
    // Method to check if the knight can move to a specified position
    canMoveCar(toX, toY) {
      const [x, y] = this.knightPosition  // Current position of the knight
      const dx = toX - x  // Change in the x-coordinate
      const dy = toY - y  // Change in the y-coordinate
      // Return true if the move is valid for a knight (L-shaped move)
      return (
            (dx === 1 ) || (dx === 0 && Math.abs(dy) > 0)
      )
    }
    
    // Method to notify all observers of a change
    emitChange() {
      const pos = this.knightPosition  // Current position of the knight
      // Call each observer with the current position
      this.observers.forEach((o) => o && o(pos))
    }

    checkLocation(x,y){
        for(let i = 0; i < this.cars.length; i++){
            if(this.cars[i][0] === x && this.cars[i][1] === y){
                return i;
            }
        }
        return -1;
    }
}
*/
// BlueCarInitializer.js

export class GreenCarInitializer {
    constructor() {
      this.cars = [];  // Array to store blue cars
      this.observers = [];  // Array to store observers (e.g., React components)
    }
  
    // Method to add a blue car to the array
    addCar(car) {
      this.cars.push(car);
      this.notifyObservers();  // Notify observers of the change
    }
  
    // Method to delete a blue car from the array
    deleteCar(index) {
      this.cars.splice(index, 1);
      this.notifyObservers();  // Notify observers of the change
    }
  
    // Method to notify all observers of a change
    notifyObservers() {
      this.observers.forEach(observer => observer(this.cars));
    }
  
    // Method to observe changes
    observe(observer) {
      this.observers.push(observer);
      observer(this.cars);  // Emit the current state to the new observer
      return () => {
        this.observers = this.observers.filter(obs => obs !== observer);
      };
    }
  }