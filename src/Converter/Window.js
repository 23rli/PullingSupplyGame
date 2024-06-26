// Importing necessary hooks from React
//Add Clause to update appbar when converter is used
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import {TransitionDialog} from '../TransitionScreen/Transition'


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const DraggableDialog = ({roundManager}) => {
  const [open, setOpen] = React.useState(false);
  const [rRes, setRRes] = React.useState('');
  const [bRes, setBRes] = React.useState('');
  const [yRes, setYRes] = React.useState('');
  const [ExChange, setExChange] = React.useState('');

  const handleRedChange = (event) => {
    setRRes(Number(event.target.value) || '');
  };
  const handleYellowChange = (event) => {
    setYRes(Number(event.target.value) || '');
  };
  const handleBlueChange = (event) => {
    setBRes(Number(event.target.value) || '');
  };


  console.log("roundManager", roundManager);

  const handleExChange = (event) => {
    setExChange(String(event.target.value) || '');
  };

  const handleConversion = (event) => {
    if(Number(rRes) + Number(bRes) + Number(yRes) != 4){
      console.log(rRes)
      console.log(bRes)
      console.log(yRes)
      console.log("Your values don't equal to four")
    }else if(ExChange != 'y' && ExChange != 'r' && ExChange != 'b' ){
      console.log("You forgot to set the resource you wish to exchange for")
    }else if(rRes > roundManager.roundResources[0] || yRes > roundManager.roundResources[1] || bRes > roundManager.roundResources[2]){
      console.log("You can't exchange nonexistant resources!")
    }else{
      roundManager.roundResources[0] -= rRes;
      setRRes('')
      roundManager.roundResources[1] -= yRes;
      setYRes('')
      roundManager.roundResources[2] -= bRes;
      setBRes('')
      if(ExChange == 'r'){
        roundManager.roundResources[0] += 1;
      }else if(ExChange == 'y'){
        roundManager.roundResources[1] += 1;
      }else{
        roundManager.roundResources[2] += 1;
      }
      setExChange('')
      roundManager.carManager.emitChange();
      roundManager.callTransition();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    roundManager.callTransition();
    console.log("reached")
    setOpen(false);
  };

  

  return (
    <React.Fragment>
      <Button variant="outlined" color = "inherit" onClick={handleClickOpen}>
        Converter
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Converter
        </DialogTitle>
        <DialogContent>
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
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              m: 5}}
              alignItems="center"
              justifyContent="center"

          >
            <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="red-resource-selection-label">Red Resources</InputLabel>
                <Select
                  labelId="red-resource-selection-label"
                  id="red-resource-selection"
                  value={rRes}
                  onChange={handleRedChange}
                  input={<OutlinedInput label="Red Resources" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                </Select>
              </FormControl>
              <img src={require("./plus.png")} width={70} height={70} alt="Logo" />
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="yellow-resource-selection-label">Yellow Resources</InputLabel>
                <Select
                  labelId="yellow-resource-selection-label"
                  id="yellow-resource-selection"
                  value={yRes}
                  onChange={handleYellowChange}
                  input={<OutlinedInput label="Yellow Resources" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>

                </Select>
              </FormControl>
              <img src={require("./plus.png")} width={70} height={70} alt="Logo" />
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="blue-resource-selection-label">Blue Resources</InputLabel>
                <Select
                  labelId="blue-resource-selection-label"
                  id="blue-resource-selection"
                  value={bRes}
                  onChange={handleBlueChange}
                  input={<OutlinedInput label="Blue Resources" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                </Select>
              </FormControl>
              
              <img src={require("./equal.png")} width={75} height={75} alt="Logo" />
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="exchange-resource-label">Exchanged Resource</InputLabel>
                <Select
                  labelId="exchange-resource-label"
                  id="exchange-resource"
                  value={ExChange}
                  onChange={handleExChange}
                  input={<OutlinedInput label="Exchanged Resource" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"b"}>Blue</MenuItem>
                  <MenuItem value={"r"}>Red</MenuItem>
                  <MenuItem value={"y"}>Yellow</MenuItem>
                </Select>
              </FormControl>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConversion}>Exchange</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}