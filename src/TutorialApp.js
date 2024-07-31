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

const screenStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  backgroundColor: '#2c387e',
};

const StartScreen = ({ onStart }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Welcome to the Game!</h1>
    <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>Team Game</button>
    <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>Individual Game</button>
  </div>
);

const EndScreen = ({ onRestart, backToHomePage }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Game Over!</h1>
    <button onClick={onRestart} style={{ padding: '10px 20px', fontSize: '16px' }}>Play Again</button>
    <button onClick={backToHomePage} style={{ padding: '10px 20px', fontSize: '16px' }}>Back to Homepage</button>
  </div>
);

export const TutorialApp = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', or 'end'
  const roundManager = useMemo(() => new Round(0), []);
  const longMemory = useMemo(() => new LongMemory(), []);

  const homepage = () => setGameState('start')
  const startGame = () => setGameState('playing');
  const endGame = () => setGameState('end');

  return (
    <>
      {gameState === 'start' && (
        <div style={screenStyle}>
          <StartScreen onStart={startGame} />
        </div>
      )}
      {gameState === 'playing' && (
        <div style={containerStyle}>
          <Board roundManager={roundManager} longMemory={longMemory} endGame={endGame} />
        </div>
      )}
      {gameState === 'end' && (
        <div style={screenStyle}>
          <EndScreen onRestart={startGame} backToHomePage = {homepage}/>
        </div>
      )}
    </>
  );
};
 