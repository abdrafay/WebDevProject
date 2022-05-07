import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function DateForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Set Date
      </Typography>
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="datetime-local"
          label="Start-Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 350 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          label="End-Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 350 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    </>
  );
}
