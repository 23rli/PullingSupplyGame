// Importing the Knight component from the same directory
import { Knight } from './Knight.js'

// Piece component that conditionally renders the Knight component
export const Piece = ({ isKnight }) => (
  isKnight ? <Knight /> : null  // Render the Knight component if isKnight is true, otherwise render nothing (null)
)