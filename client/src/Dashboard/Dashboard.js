import React, { useEffect, useContext, useState } from "react";
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
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [join, setJoin] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
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

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/projects/", {
          headers: {
            Authorization: `Bearer ${appState.token}`,
          },
        });

        appDispatch({
          type: "SET_PROJECT",
          payload: response.data,
        });
        console.log(response.data);
        setProjects(response.data);
        console.log("project", projects);
        setLoading(false);
        // console.log('setting to false')
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
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
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleClickOpen}
              >
                Create Project
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
          {/* <ProjectList /> */}
          {/* Row */}
          <div className="row m-0">
            {projects.length !== 0
              ? projects.map((project, ind) => (
                  <div className="col-lg-4 col-md-6 col-12" key={ind}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                  </div>
                ))
              : ""}
          </div>
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
  }
};

export default Dashboard;
