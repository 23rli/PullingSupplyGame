import blueCarEmpty from '../../Pieces/Cars/Motor City Graphics/Model B - empty.png';
import redCarEmpty from '../../Pieces/Cars/Motor City Graphics/Model R - empty.png';
import yellowCarEmpty from '../../Pieces/Cars/Motor City Graphics/Model Y - empty.png';
import greenCarEmpty from '../../Pieces/Cars/Motor City Graphics/Model G - empty.png';


// Import necessary hooks from React and Material UI components
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export const RecipeScreen = ({ roundManager }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Car data for display
  const carData = [
    { name: "Blue Car", recipe: { red: 3, yellow: 3, blue: 2 }, image: blueCarEmpty },
    { name: "Green Car", recipe: { red: 2, yellow: 2, blue: 2 }, image: greenCarEmpty },
    { name: "Red Car", recipe: { red: 3, yellow: 2, blue: 2 }, image: redCarEmpty },
    { name: "Yellow Car", recipe: { red: 2, yellow: 3, blue: 2 }, image: yellowCarEmpty },
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Recipes
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
          Recipes
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {carData.map((car, index) => (
              <Grid container item xs={12} key={index} alignItems="center" spacing={2}>
                {/* Left Side: Car Names and Images */}
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h6" gutterBottom>
                      {car.name}
                    </Typography>
                    <img src={car.image} alt={`${car.name}`} width="100" />
                  </Box>
                </Grid>

                {/* Right Side: Car Recipes */}
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Red: {car.recipe.red}, Yellow: {car.recipe.yellow}, Blue: {car.recipe.blue}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
