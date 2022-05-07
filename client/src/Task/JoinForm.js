import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const JoinForm = () => {
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
            label="Project Key"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button variant="contained" sx={{ mt: 3 }}>
          Join
        </Button>
      </Box>
    </>
  );
};

export default JoinForm;
