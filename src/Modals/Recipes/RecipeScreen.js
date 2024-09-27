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
    { name: "Blue Car", recipe: { red: 3, yellow: 3, blue: 2 } },
    { name: "Green Car", recipe: { red: 2, yellow: 2, blue: 2 } },
    { name: "Red Car", recipe: { red: 3, yellow: 2, blue: 2 } },
    { name: "Yellow Car", recipe: { red: 2, yellow: 3, blue: 2 } },
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
            {/* Left Side: Car Names */}
            <Grid item xs={6}>
              {carData.map((car, index) => (
                <Typography key={index} variant="h6" gutterBottom>
                  {car.name}
                </Typography>
              ))}
            </Grid>

            {/* Right Side: Car Recipes */}
            <Grid item xs={6}>
              {carData.map((car, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  Red: {car.recipe.red}, Yellow: {car.recipe.yellow}, Blue: {car.recipe.blue}
                </Typography>
              ))}
            </Grid>
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
