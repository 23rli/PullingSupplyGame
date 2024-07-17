import { useMemo, useState } from 'react';
import { Board } from './Gameboard/Board.js';
import { Round } from './Rules/Round.js';
import { LongMemory } from './Rules/LongMemory.js';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '160vh',
  margin: 0,
  padding: 0,
  backgroundColor: '#2c387e',
};

const StartScreen = ({ onStart }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Welcome to the Game!</h1>
    <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>Start Game</button>
  </div>
);

const EndScreen = ({ onRestart }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Game Over!</h1>
    <button onClick={onRestart} style={{ padding: '10px 20px', fontSize: '16px' }}>Play Again</button>
  </div>
);

export const TutorialApp = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', or 'end'
  const roundManager = useMemo(() => new Round(0), []);
  const longMemory = useMemo(() => new LongMemory(), []);

  const startGame = () => setGameState('playing');
  const endGame = () => setGameState('end');

  return (
    <div style={containerStyle}>
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      {gameState === 'playing' && (
        <Board roundManager={roundManager} longMemory={longMemory} onEnd={endGame} />
      )}
      {gameState === 'end' && (
        <EndScreen onRestart={startGame} />
      )}
    </div>
  );
};
