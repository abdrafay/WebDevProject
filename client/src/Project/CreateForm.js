import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function CreateForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Task Details
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="key"
            name="key"
            label="Project Key"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            id="task"
            name="task"
            label="Task Title"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="description"
            label="Task Description"
            multiline
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}
