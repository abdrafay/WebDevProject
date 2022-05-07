import React , {useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";


const user = false;

function Navbar() {
  
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const handleLogout = (e) => {
    e.preventDefault()
    appDispatch({
      type: "LOGOUT",
    });
    
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            WebDEVAPP
          </Typography>
          {appState.loggedIn ? (
            <Button sx={{ my: 1, mx: 1.5 }} onClick={(e)=> handleLogout(e)} color="inherit">
              Logout
            </Button>
            
          ) : (
            ''
          )}
          <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href="/">
            Home
          </Button>
          {/* <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href=".\">
            Home
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
