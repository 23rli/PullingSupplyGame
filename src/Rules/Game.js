
// Defining the Game class
export class Game {
  
  knightPosition = [0, 0]

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
  
  // Method to check if the knight can move to a specified position
  canMoveKnight(toX, toY) {
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
      (dx >= 0)
    )
  }

  // Method to notify all observers of a change
  emitChange() {
    const pos = this.knightPosition  // Current position of the knight
    // Call each observer with the current position
    this.observers.forEach((o) => o && o(pos))
  }
}