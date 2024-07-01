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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fabStyle = { position: 'fixed', bottom: 30, right: 100 }; // Positioning the FAB

export default function AlertDialogSlide({roundManager}) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleAgree = () => {
    setOpen1(false);
    roundManager.advanceRound();
    setOpen2(true);
  };

  return (
    <React.Fragment>
      <Fab color="primary" aria-label="add" variant='extended' size='large' style={fabStyle} onClick={handleClickOpen1}>
        Next Round
      </Fab>


      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Would you like to proceed to the next round?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            .....
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={handleClose2}
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
          justifyContent= "center"
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
                  {roundManager.getResources(roundManager.roundNum)[0]}
                </DialogContentText>
              </Box>
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{fontSize: '30px', textAlign: 'left'}}
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
                  {roundManager.getResources(roundManager.roundNum)[1]}
                </DialogContentText>
              </Box>
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{fontSize: '30px', textAlign: 'left'}}
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
                  {roundManager.getResources(roundManager.roundNum)[2]}
                </DialogContentText>
              </Box>
            <DialogContentText
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{fontSize: '30px', textAlign: 'left'}}
            >
              Blue Resource
            </DialogContentText>

          </Box>
          
        </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Close</Button>
        </DialogActions>
      </Dialog>


    </React.Fragment>
  );
}
