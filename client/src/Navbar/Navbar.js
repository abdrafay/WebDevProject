import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const user = false;

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            JIRA
          </Typography>
          {!user ? (
            <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href=".\">
              Home
            </Button>
          ) : (
            <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href=".\">
              Logout
            </Button>
          )}
          {/* <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href=".\">
            Home
          </Button> */}
          <Button sx={{ my: 1, mx: 1.5 }} color="inherit" href="\dashboard">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
