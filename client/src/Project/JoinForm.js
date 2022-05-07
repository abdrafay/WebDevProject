import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState,useContext} from "react";
import axios from "axios"
import StateContext from "../StateContext";

const JoinForm = () => {
  const appState = useContext(StateContext)
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState('')
  const handleJoin = async () => {
    setLoading(true)
    if(key) {
      try{
        const response = await axios.post(`/api/projects/join`, {
          key: key
        },{
          headers: {
            Authorization: `Bearer ${appState.token}`,
            },
          })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('no key')
    }
    
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Join Project
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            id="key"
            name="key"
            onChange={ (event) => setKey(event.target.value) }
            value={key}
            label="Project Key"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button variant="contained" onClick={handleJoin} sx={{ mt: 3 }}>
          Join
        </Button>
      </Box>
    </>
  );
};

export default JoinForm;
