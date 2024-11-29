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
import { maxWidth } from '@mui/system';

const screenStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${splashPage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden', // Prevent scrolling inside this container
};


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '160vh',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${splashPage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
};
const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${splashPage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflowY: 'auto', // Enable scrolling on other pages
  overflowX: 'hidden',
};

const rectangleStyle = {
  backgroundColor: 'rgba(44, 56, 126, 0.9)', // Semi-transparent background
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'white',
  maxWidth: '600px',
  width: '80%',
};

const playRectangleStyle = {
  backgroundColor: 'rgba(44, 56, 126, 0.9)', // Semi-transparent background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'white',
  width: '100%',
};

const containerRectangleStyle = {
  backgroundColor: 'rgba(44, 56, 126, 0.9)', // Semi-transparent background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '50px',
  textAlign: 'center',
  color: 'white',
  width: '100%',
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

// Conditional GlobalStyle Component
const GlobalStyle = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <style>
      {`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden; /* Disable scrolling globally for the start screen */
        }
      `}
    </style>
  );
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
  <div style={pageStyle}>
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
      <GlobalStyle isActive={gameState === 'start'} />

      {gameState === 'start' && (
        <StartScreen
          onStart={startGame}
          openAdmin={admin}
          roundManager={roundManager}
          longMemory={longMemory}
        />
      )}
      {gameState === 'playing' && (
        <div style={containerStyle}>
          <div style={containerRectangleStyle}>
            <Board
              roundManager={roundManager}
              longMemory={longMemory}
              endGame={endGame}
            />
          </div>
        </div>
      )}
      {gameState === 'end' && (
        <div style={pageStyle}>
          <div style={playRectangleStyle}>
            <EndScreen
              onRestart={startGame}
              backToHomePage={homepage}
              roundManager={roundManager}
              longMemory={longMemory}
            />
          </div>
        </div>
      )}
      {gameState === 'admin' && (
        <div style={pageStyle}>
          <div style={playRectangleStyle}>
            <AdminPanel roundManager={roundManager} report={report} />
          </div>
        </div>
      )}
      {gameState === 'finalReport' && (
        <div style={pageStyle}>
          <div style={playRectangleStyle}>
            <FinalReport
              roundManager={roundManager}
              wipPenalty={roundManager.WIPPen}
              wipRound={roundManager.WIPRound}
              time={roundManager.time}
            />
          </div>
        </div>
      )}
    </>
  );
};
