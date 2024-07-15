import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const errorStyle = { position: 'fixed', bottom: 80, right: 250 }; // Positioning the error

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default function TransitionsSnackbar({ errorStatement }) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Snackbar
      open={open}
      TransitionComponent={SlideTransition}
      message={errorStatement}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      ContentProps={{
        style: errorStyle,
      }}
    />
  );
}

