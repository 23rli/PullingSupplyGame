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

export default function TransitionsSnackbar({ errorStatement, open, onClose }) {
  // We rely on the parent to manage `open`, so we don't manage state here

  return (
    <Snackbar
      open={open}
      TransitionComponent={SlideTransition}
      autoHideDuration={2000} // 2 seconds
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      style={errorStyle}
      onClose={onClose} // Trigger onClose when the Snackbar closes
    >
      <StyledSnackbarContent>
        {errorStatement}
      </StyledSnackbarContent>
    </Snackbar>
  );
}
