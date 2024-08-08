import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Grid } from '@mui/material'

import axios from 'axios'

export function CreateIndiGame({roundManager, onStart}) {
  const [open, setOpen] = React.useState(false);
  const [blueChecked, setBlueChecked] = React.useState(false);
    const [greenChecked, setGreenChecked] = React.useState(false);
    const [redChecked, setRedChecked] = React.useState(false);
    const [yellowChecked, setYellowChecked] = React.useState(false);

    const handleBlueCheckChange = (event) => {
        setBlueChecked(event.target.checked);
    };

    const handleCloseBlue = () => {
        setBlueChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleGreenCheckChange = (event) => {
        setGreenChecked(event.target.checked);
    };

    const handleCloseGreen = () => {
        setGreenChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleRedCheckChange = (event) => {
        setRedChecked(event.target.checked);
    };

    const handleCloseRed = () => {
        setRedChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleYellowCheckChange = (event) => {
        setYellowChecked(event.target.checked);
    };

    const handleCloseYellow = () => {
        setYellowChecked(false); // Reset the checkbox state when closing the dialog
    };

    const handleCreateGame = async (
      username, 
      blueCar, bluePenalty, 
      greenCar, greenPenalty, 
      redCar, redPenalty, 
      yellowCar, yellowPenalty, 
      rolls, code, 
      blueRevenue, greenRevenue, 
      redRevenue, yellowRevenue
    ) => {
      try {
        const response = await axios.post('http://localhost:8080/registergame', {
          blueCar: blueCar, 
          bluePenalty: bluePenalty,
          greenCar: greenCar,
          greenPenalty: greenPenalty,
          redCar: redCar,
          redPenalty: redPenalty,
          yellowCar: yellowCar,
          yellowPenalty: yellowPenalty,
          rolls: rolls,
          mode: 0,
          code: code,
          blueRevenue: blueRevenue,
          greenRevenue: greenRevenue,
          redRevenue: redRevenue,
          yellowRevenue: yellowRevenue,
          gameState: "IN PROGRESS"
        });
        
        console.log(response.data); // Log the response data
    
        roundManager.gameId = response.data.gameId; // Accessing 'gameId'
        roundManager.setGameResources(rolls)
        roundManager.setCars(blueCar, greenCar, redCar, yellowCar)
        roundManager.setRevenue(blueRevenue, greenRevenue, redRevenue, yellowRevenue)
        console.log(roundManager);
        handleCreateUser(username);
        onStart();
        
      } catch (error) {
        console.error('Error registering:', error);
      }
    };
    

      const handleCreateUser = async (username) => {
        console.log("reached create user")
        try {
            const response = await  axios.post('http://localhost:8080/registeruser', 
              {
                username: username,
                privledge: "player",
                gameId: roundManager.gameId
              })
            roundManager.userId = response.data.userId; // Accessing 'newId' instead of 'id'
            console.log(roundManager);
        } catch (error) {
            console.error('Error registering:', error);
        }
      };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button 
        variant="outlined" 
        onClick={handleClickOpen}
        sx={{
          fontSize: '1.5rem', // Adjust font size to make it larger
          color: '#2c387e', // Text color
          backgroundColor: 'white', // Background color
          borderColor: 'white', // Border color
          padding: '10px 20px', // Padding to make it larger
          margin: '20px', // Margin
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color on hover
            borderColor: 'white', // Border color on hover
          }
        }}
      >
        Individual Game
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const username = formJson.username;
            const blueRevenue = formJson.blueRevenue;
            const greenRevenue = formJson.greenRevenue;
            const redRevenue = formJson.redRevenue;
            const yellowRevenue = formJson.yellowRevenue;
            const bluePenalty = formJson.blueWIPPenalty;
            const greenPenalty = formJson.greenWIPPenalty;
            const redPenalty = formJson.redWIPPenalty;
            const yellowPenalty = formJson.yellowWIPPenalty;
            const blueCar = blueChecked ? 1 : 0;
            const greenCar = greenChecked ? 1 : 0;
            const redCar = redChecked ? 1 : 0;
            const yellowCar = yellowChecked ? 1 : 0;

            let code = Number("" + (Math.random() * 9 + 1) + Math.random() * 10 + Math.random() 
            * 10 + Math.random() * 10 + Math.random() * 10 + Math.random() * 10);

            let rolls = '';

            for(let i = 0; i < 100; i++){
              const red = parseInt(Math.random() * 10 + 1);
              const yellow = parseInt(Math.random() * 8 + 1);
              const blue = parseInt(Math.random() * 4 + 1);
              rolls += red + ",";
              rolls += yellow + ",";
              rolls += blue + ",";
            }

            console.log(blueRevenue)
            handleCreateGame(username, blueCar, bluePenalty, greenCar, greenPenalty, 
              redCar, redPenalty, yellowCar, yellowPenalty, rolls, code, blueRevenue, greenRevenue,
              redRevenue, yellowRevenue);

            handleClose();
          },
        }}
      >
        <DialogTitle>Create Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adjust the Parameters to Begin
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="username"
            label="Username"
            type="text"
            variant="standard"
            defaultValue={"Guest"}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={blueChecked}
                    onChange={handleBlueCheckChange}
                    name="enableBlue"
                    color="primary"
                  />
                }
                label="Enable Blue Cars"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="blueRevenue"
                label="Blue Revenue per Car"
                type="number"
                variant="standard"
                defaultValue={3.00}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!blueChecked}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="blueWIPPenalty"
                label="Blue WIP Penalty"
                type="number"
                variant="standard"
                defaultValue={1.50}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!blueChecked}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={greenChecked}
                    onChange={handleGreenCheckChange}
                    name="enableGreen"
                    color="primary"
                  />
                }
                label="Enable Green Cars"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="greenRevenue"
                label="Green Revenue per Car"
                type="number"
                variant="standard"
                defaultValue={2.00}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!greenChecked}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="greenWIPPenalty"
                label="Green WIP Penalty"
                type="number"
                variant="standard"
                defaultValue={1.00}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!greenChecked}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={redChecked}
                    onChange={handleRedCheckChange}
                    name="enableRed"
                    color="primary"
                  />
                }
                label="Enable Red Cars"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="redRevenue"
                label="Red Revenue per Car"
                type="number"
                variant="standard"
                defaultValue={2.50}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!redChecked}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="redWIPPenalty"
                label="Red WIP Penalty"
                type="number"
                variant="standard"
                defaultValue={1.25}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!redChecked}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yellowChecked}
                    onChange={handleYellowCheckChange}
                    name="enableYellow"
                    color="primary"
                  />
                }
                label="Enable Yellow Cars"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="yellowRevenue"
                label="Yellow Revenue per Car"
                type="number"
                variant="standard"
                defaultValue={2.50}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!yellowChecked}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                name="yellowWIPPenalty"
                label="Yellow WIP Penalty"
                type="number"
                variant="standard"
                defaultValue={1.25}
                inputProps={{
                  step: 0.01,
                  min: "0",
                }}
                fullWidth
                disabled={!yellowChecked}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
