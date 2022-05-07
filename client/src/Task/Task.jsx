import React from "react";
import ProjectList from "../Project/ProjectList";
import ProjectForm from "../Project/ProjectForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Container, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ShareIcon from "@mui/icons-material/Share";
import JoinForm from "../Project/JoinForm";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Task = () => {
  const [open, setOpen] = React.useState(false);
  const [join, setJoin] = React.useState(false);

  const handleJoin = () => {
    setJoin(true);
  };

  const handleUnjoin = () => {
    setJoin(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Box
          sx={{
            mt: 5,
            mb: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Task</h1>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleClickOpen}
            >
              Create Task
            </Button>
            {/* <Button
              variant="contained"
              color="inherit"
              justifyContent="left"
              startIcon={<ShareIcon />}
              onClick={handleJoin}
            >
              Join Project
            </Button> */}
          </Stack>
        </Box>
        <ProjectList />
      </Container>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={"md"}
          fullWidth={true}
        >
          {/* <DialogTitle>Project Form</DialogTitle> */}
          <DialogContent>
            <ProjectForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={join}
          onClose={handleUnjoin}
          maxWidth={"md"}
          fullWidth={true}
        >
          {/* <DialogTitle>Project Form</DialogTitle> */}
          <DialogContent>
            <JoinForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUnjoin}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Task;
