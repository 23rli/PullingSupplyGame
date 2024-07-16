import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

const errorStyle = { position: 'fixed', bottom: 100, right: 110 }; // Positioning the error

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const StyledSnackbarContent = styled('div')(({ theme }) => ({
  backgroundColor: 'darkred',
  color: 'white',
  fontSize: '1.2em',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: '400px'
}));

export default function TransitionsSnackbar({ errorStatement, open, onClose, timeOpen }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, timeOpen);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar
      open={open}
      TransitionComponent={SlideTransition}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      style={errorStyle} // Apply errorStyle here
    >
      <StyledSnackbarContent>
        {errorStatement}
      </StyledSnackbarContent>
    </Snackbar>
  );
}
