import { useMemo, useState } from 'react';
import { Board } from './Gameboard/Board.js';
import { Round } from './Rules/Round.js';
import { LongMemory } from './Rules/LongMemory.js';
import { CreateGroupGame } from './Modals/GameCreation/CreateGroupGame.js'
import { CreateIndiGame } from './Modals/GameCreation/CreateIndiGame.js'

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

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px 0' // Adds margin between buttons
};

const StartScreen = ({ onStart, roundManager }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Welcome to the Game!</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CreateGroupGame roundManager = {roundManager}/>
      <CreateIndiGame roundManager = {roundManager}/>
      <button onClick={onStart} style={buttonStyle}>Individual Game</button>
    </div>
  </div>
);

const EndScreen = ({ onRestart, backToHomePage }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Game Over!</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={onRestart} style={buttonStyle}>Play Again</button>
      <button onClick={backToHomePage} style={buttonStyle}>Back to Homepage</button>
    </div>
  </div>
);

export const TutorialApp = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', or 'end'
  const roundManager = useMemo(() => new Round(0), []);
  const longMemory = useMemo(() => new LongMemory(), []);

  const homepage = () => setGameState('start');
  const startGame = () => setGameState('playing');
  const endGame = () => setGameState('end');

  return (
    <>
      {gameState === 'start' && (
        <div style={screenStyle}>
          <StartScreen onStart={startGame} roundManager={roundManager} />
        </div>
      )}
      {gameState === 'playing' && (
        <div style={containerStyle}>
          <Board roundManager={roundManager} longMemory={longMemory} endGame={endGame} />
        </div>
      )}
      {gameState === 'end' && (
        <div style={screenStyle}>
          <EndScreen onRestart={startGame} backToHomePage={homepage} />
        </div>
      )}
    </>
  );
};
