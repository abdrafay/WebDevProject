import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Avatar, Chip, Grid, IconButton, InputBase } from "@mui/material";

function createData(title, nature, deadline, status, owner) {
  return { title, nature, deadline, status, owner };
}

const rows = [
  createData("Web Development", "Bug", 6.0, "todo", "John Doe"),
  createData("Speed Programming", "Task", 9.0, "completed", "John Doe"),
  createData("Data Science", "Bug", 16.0, "closed", "Sami"),
];

const options = ["None", "Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function ProjectList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Grid container spacing={5} xs={12}>
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{
              p: "8px 4px",
              margin: "18px 20px",
              display: "flex",
              alignItems: "center",
              width: 400,
              color: "text.primary",
              backgroundColor: "#383838",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Task by title"
              type="email"
            />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Nature</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={row.nature}
                  color={row.nature === "Bug" ? "error" : "warning"}
                />
              </TableCell>
              <TableCell align="center">{row.deadline}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.status}
                  color={row.status === "todo" ? "primary" : "success"}
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  color="secondary"
                  avatar={<Avatar> {row.owner[0]} </Avatar>}
                  label={row.owner}
                />
              </TableCell>
              <TableCell>
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
