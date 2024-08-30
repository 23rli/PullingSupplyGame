import { useMemo, useState } from 'react';
import { Board } from './Gameboard/Board.js';
import { Round } from './Rules/Round.js';
import { LongMemory } from './Rules/LongMemory.js';
import { CreateIndiGame } from './Modals/GameCreation/CreateIndiGame.js'
import { CreateGroupGame } from './Modals/GameCreation/CreateGroupGame.js'
import GameDataTable from './Modals/Statistics/DataTable.js'

import { AdminPanel } from './Admin/AdminPanel.js'
import { FinalReport } from './Admin/FinalReport.js';

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

const StartScreen = ({ onStart, openAdmin, roundManager }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Welcome to Motor City!</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CreateGroupGame roundManager = {roundManager} onStart = {onStart} openAdmin = {openAdmin}/>
      <CreateIndiGame roundManager = {roundManager} onStart = {onStart}/>
    </div>
  </div>
);

const EndScreen = ({ onRestart, backToHomePage, roundManager, longMemory }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h1>Game Over!</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={backToHomePage} style={buttonStyle}>Back to Homepage</button>
      <GameDataTable roundManager = {roundManager} longMemory = {longMemory}/>
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
  const admin = () => setGameState('admin')
  const report = () => setGameState('finalReport')

  return (
    <>
      {gameState === 'start' && (
        <div style={screenStyle}>
          <StartScreen onStart={startGame} openAdmin = {admin} roundManager={roundManager} />
        </div>
      )}
      {gameState === 'playing' && (
        <div style={containerStyle}>
          <Board roundManager={roundManager} longMemory={longMemory} endGame={endGame} />
        </div>
      )}
      {gameState === 'end' && (
        <div style={screenStyle}>
          <EndScreen onRestart={startGame} backToHomePage={homepage} roundManager = {roundManager} longMemory = {longMemory} />
        </div>
      )}
      {gameState === 'admin' && (
        <div style={screenStyle}>
          <AdminPanel roundManager = {roundManager} report = {report}/>
        </div>
      )}
      {gameState === 'finalReport' && (
        <div style={screenStyle}>
          <FinalReport roundManager = {roundManager} wipPenalty = {roundManager.WIPPen} wipRound = {roundManager.WIPRound} time = {roundManager.time}/>
        </div>
      )}

    </>
  );
};
