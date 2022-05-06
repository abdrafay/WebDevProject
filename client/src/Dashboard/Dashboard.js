import React from "react";
import ProjectList from "../Project/ProjectList";
import ProjectForm from "../Project/ProjectForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Container } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);

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
          <h1>Project</h1>
          <Button
            variant="contained"
            color="inherit"
            justifyContent="left"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleClickOpen}
          >
            Create Project
          </Button>
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
          <DialogTitle>Project Form</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <ProjectForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
