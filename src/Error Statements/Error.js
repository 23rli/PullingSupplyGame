import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function TransitionsSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleIllegalResMove = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleIllegalPaintMove = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleIllegalWaitMove = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };



  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
      <Button onClick={handleClick(Fade)}>Fade Transition</Button>
      <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message=""
        key={state.Transition.name}
        autoHideDuration={600}
      />



    </div>
  );
}