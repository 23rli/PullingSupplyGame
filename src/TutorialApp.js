import { useMemo, useState } from 'react';
import splashPage from './splashPage.png'; // Import the background image
import { Board } from './Gameboard/Board.js';
import { Round } from './Rules/Round.js';
import { LongMemory } from './Rules/LongMemory.js';
import { CreateIndiGame } from './Modals/GameCreation/CreateIndiGame.js';
import { CreateGroupGame } from './Modals/GameCreation/CreateGroupGame.js';
import GameDataTable from './Modals/Statistics/DataTable.js';
import { AdminPanel } from './Admin/AdminPanel.js';
import { FinalReport } from './Admin/FinalReport.js';

const screenStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '105vw',
  height: '105vh',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${splashPage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const rectangleStyle = {
  backgroundColor: 'rgba(44, 56, 126, 0.8)', // Semi-transparent background
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'white',
  maxWidth: '600px',
  width: '80%',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px 0',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#5a5c6c',
  color: 'white',
};

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

const StartScreen = ({ onStart, openAdmin, roundManager, longMemory }) => (
  <div style={screenStyle}>
    <div style={rectangleStyle}>
      <h1>Welcome to Motor City!</h1>
      <div style={buttonContainerStyle}>
        <CreateGroupGame
          roundManager={roundManager}
          onStart={onStart}
          openAdmin={openAdmin}
          longMemory={longMemory}
        />
        <CreateIndiGame roundManager={roundManager} onStart={onStart} />
      </div>
    </div>
  </div>
);

const EndScreen = ({ onRestart, backToHomePage, roundManager, longMemory }) => (
  <div style={screenStyle}>
    <div style={rectangleStyle}>
      <h1>Game Over!</h1>
      <div style={buttonContainerStyle}>
        <button onClick={backToHomePage} style={buttonStyle}>
          Back to Homepage
        </button>
        <GameDataTable roundManager={roundManager} longMemory={longMemory} />
      </div>
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
  const admin = () => setGameState('admin');
  const report = () => setGameState('finalReport');

  return (
    <>
      {gameState === 'start' && (
        <div style={screenStyle}>
          <StartScreen
            onStart={startGame}
            openAdmin={admin}
            roundManager={roundManager}
            longMemory={longMemory}
          />
        </div>
      )}
      {gameState === 'playing' && (
        <div style={containerStyle}>
          <Board
            roundManager={roundManager}
            longMemory={longMemory}
            endGame={endGame}
          />
        </div>
      )}
      {gameState === 'end' && (
        <div style={screenStyle}>
          <EndScreen
            onRestart={startGame}
            backToHomePage={homepage}
            roundManager={roundManager}
            longMemory={longMemory}
          />
        </div>
      )}
      {gameState === 'admin' && (
        <div style={screenStyle}>
          <AdminPanel roundManager={roundManager} report={report} />
        </div>
      )}
      {gameState === 'finalReport' && (
        <div style={screenStyle}>
          <FinalReport
            roundManager={roundManager}
            wipPenalty={roundManager.WIPPen}
            wipRound={roundManager.WIPRound}
            time={roundManager.time}
          />
        </div>
      )}
    </>
  );
};
