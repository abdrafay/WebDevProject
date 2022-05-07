import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton, InputBase, MenuItem, Paper, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MemberForm() {
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Member
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{
              p: "8px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Type email address"
              type="email"
            />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Role
          </Typography>

          <Select
            id="role"
            value={role}
            variant="standard"
            onChange={handleChange}
            autoWidth
            label="Role"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="lead">Lead</MenuItem>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="volunteer">Volunteer</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
}
