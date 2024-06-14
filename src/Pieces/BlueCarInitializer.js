/*
SO this is the plan.
Make 15 Blue cars and 15 green cars with the same functionality as Knight
Have them all located at 0,1 or 0,2
Then have it so when a user drags a vehicle, its only draggable if the units before it haven't been dragged
This progresses until the unit dragged finishes. It then makes some changes and teleports back to the first block to repeat the cycle.
*/

import { BlueCarVisual } from "./BlueCarVisual"

export class BlueCars{

    constructor(){
        this.initialPosition = [0,2]
        this.cars = [[0,0,2]];
        this.count = 0;
        this.produced = 0;
        this.visuals = BlueCarVisual;
    }
/*
    addCar(){
        this.cars.push()
        this.cars[this.count] = [this.count,0,2]
        this.count += 1;
    }

    deleteCar(count){
        this.cars.splice(count, 1);
        this.produced += 1;
    }

*/
  
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
  /*
    gravitateUp(toX, toY){
      for(let i = 0; i < this.BlueCars.length; i++){
        if(this.BlueCars[i][0] === toX && this.BlueCars[i][1]){
  
        }
      }
    }
  */
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
