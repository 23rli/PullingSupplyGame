import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function createGroupGame() {
  const [openIntro, setOpenIntro] = React.useState(false);
  const [openJoin, setOpenJoin] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openWaitJoin, setOpenWaitJoin] = React.useState(false);
  const [openWaitCreate, setOpenWaitCreate] = React.useState(false);

  const handleOpenIntro = () => {
    setOpenIntro(true);
  };

  const handleCloseIntro = () => {
    setOpenIntro(false);
  };

  const handleOpenJoin = () => {
    setOpenIntro(false);
    setOpenJoin(true);
  };

  const handleCloseJoin = () => {
    setOpenJoin(false);
  };
  const handleOpenCreate = () => {
    setOpenIntro(false);
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setCreate(false);
  };
  const handleOpenWaiJoin = () => {
    setOpenJoin(false);
    setOpenWaitJoin(true);
  };

  const handleCloseWaitJoin = () => {
    setOpenWaitJoin(false);
  };

  const handleOpenWaiCreate = () => {
    setOpenCreate(false);
    setOpenWaitCreate(true);
  };

  const handleCloseWaitCreate = () => {
    setOpenWait(false);
  };



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Team Game
      </Button>
      <Dialog
        open={openIntro}
        onClose={handleCloseIntro}
      >
        <DialogTitle>Team Game</DialogTitle>
        <DialogContent>
          <Button onClick={handleOpenJoin}>Join Game</Button>
          <Button onClick={handleOpenCreate}>Create Game</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openCreate}
        onClose={handleCloseCreate}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
