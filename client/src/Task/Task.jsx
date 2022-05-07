import React , { useEffect, useContext }from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Container, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ShareIcon from "@mui/icons-material/Share";
import JoinForm from "../Project/JoinForm";
import axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

// get id from params
import { useParams } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Task = () => {
  const [open, setOpen] = React.useState(false);
  const [join, setJoin] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  let {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`/api/projects/${id}/tasks`, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        }
      })
      setTasks(response.data)
      appDispatch({ type: "setTasks", tasks: response.data })
      setLoading(false)
    }
    fetchData();
      
  },[id])

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
  if(!loading){
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
        <TaskList tasks={tasks} setTasks={setTasks}/>
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
            <TaskForm />
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
          } else {
            return <div>Loading...</div>
          }
};

export default Task;
