import Fab from '@mui/material/Fab'; // Importing Fab from MUI
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { LongMemory } from '../../Rules/LongMemory';
import { ShortMemory } from '../../Rules/ShortMemory';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fabStyleNR = { position: 'fixed', bottom: 30, right: 100 }; // Positioning the FAB
const fabStyleReset = { position: 'fixed', bottom: 30, right: 250 }; // Positioning the FAB
const fabStyleEnd = { position: 'fixed', bottom: 30, right: 400 }; // Positioning the FAB

function commitLongMem({roundManager, longMemory}){
  roundManager.setShortTermMem();
  console.log(roundManager)
  longMemory.commitPosition({roundManager})
  longMemory.commitResources({roundManager})
}

export default function AlertDialogSlide({ roundManager, longMemory, endGame }) {
  const [openNRPrompt, setOpenNRPrompt] = React.useState(false);
  const [openResReport, setOpenResReport] = React.useState(false);
  const [openReset, setOpenReset] = React.useState(false);
  const [openEnd, setOpenEnd] = React.useState(false);

  const handleClickOpenNRPrompt = () => {
    setOpenNRPrompt(true);
  };

  const handleClickOpenResReport = () => {
    setOpenResReport(true);
  };

  const handleClickOpenReset = () => {
    setOpenReset(true);
  }
  const handleClickOpenEnd = () => {
    setOpenEnd(true);
  }

  const handleCloseNRPrompt = () => {
    setOpenNRPrompt(false);
  };

  const handleCloseResReport = () => {
    setOpenResReport(false);
  };

  const handleCloseReset = () => {
    setOpenReset(false);
  };

  const handleCloseEnd = () => {
    setOpenEnd(false);
  };


  const handleAgreeNR = () => {
    setOpenNRPrompt(false);
    console.log("button next round pressed")
    commitLongMem({roundManager, longMemory})
    roundManager.advanceRound();
    setOpenResReport(true);
  };

  const handleAgreeReset = () => {
    setOpenReset(false);
    roundManager.resetRound();
  };

  const handleAgreeEnd = () => {
    console.log("reached handleagreeend")
    setOpenEnd(false);
    endGame();
    roundManager.endGame = true;
  };

  return (
    <React.Fragment>
      <Fab color="default" aria-label="NextRound" variant='extended' size='large' style={fabStyleNR} onClick={handleClickOpenNRPrompt}>
        Next Round
      </Fab>

      <Fab color="default" aria-label="add" variant='extended' size='large' style={fabStyleReset} onClick={handleClickOpenReset}>
        Reset Round
      </Fab>

      <Fab color="default" aria-label="add" variant='extended' size='large' style={fabStyleEnd} onClick={handleClickOpenEnd}>
        End Game
      </Fab>


      <Dialog
        open={openReset}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseReset}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Would you like to Reset your progress to the beginning of this round?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            .....
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReset}>Disagree</Button>
          <Button onClick={handleAgreeReset}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEnd}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEnd}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Would you like to End the Game (Game will end when you finish this round)?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            .....
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnd}>Disagree</Button>
          <Button onClick={handleAgreeEnd}>Agree</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={openNRPrompt}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseNRPrompt}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Would you like to proceed to the next round?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            .....
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNRPrompt}>Disagree</Button>
          <Button onClick={handleAgreeNR}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openResReport}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={handleCloseResReport}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Welcome to Round: " + roundManager.roundNum}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Here are you're resources for this round:
          </DialogContentText>

          <Box
            height={100}
            my={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={2}
          >
            <Box
              sx={{
                width: 250,
                height: 200,
                borderRadius: 1,
                bgcolor: '#e53935',
                '&:hover': {
                  bgcolor: '#ea605d',
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px', textAlign: 'left', color: '#e53935' }}
                >
                  '
                </DialogContentText>
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px' }}
                >
                  {roundManager.roundResources[0]}
                </DialogContentText>
              </Box>
              <DialogContentText
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ fontSize: '30px', textAlign: 'left' }}
              >
                Red Resource
              </DialogContentText>
            </Box>


            <Box
              sx={{
                width: 250,
                height: 200,
                borderRadius: 1,
                bgcolor: '#ffeb3b',
                '&:hover': {
                  bgcolor: '#ffef62',
                },
              }}>
              <Box display="flex" alignItems="center">
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px', textAlign: 'left', color: '#ffeb3b' }}
                >
                  '
                </DialogContentText>
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px' }}
                >
                  {roundManager.roundResources[1]}
                </DialogContentText>
              </Box>
              <DialogContentText
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ fontSize: '30px', textAlign: 'left' }}
              >
                Yellow Resource
              </DialogContentText>
            </Box>

            <Box
              sx={{
                width: 250,
                height: 200,
                borderRadius: 1,
                bgcolor: '#2196f3',
                '&:hover': {
                  bgcolor: '#4dabf5',
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px', textAlign: 'left', color: '#2196f3' }}
                >
                  '
                </DialogContentText>
                <DialogContentText
                  variant="h1"
                  sx={{ fontSize: '120px' }}
                >
                  {roundManager.roundResources[2]}
                </DialogContentText>
              </Box>
              <DialogContentText
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ fontSize: '30px', textAlign: 'left' }}
              >
                Blue Resource
              </DialogContentText>

            </Box>

          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResReport}>Close</Button>
        </DialogActions>
      </Dialog>


    </React.Fragment>
  );
}
