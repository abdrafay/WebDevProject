import React, {useEffect, useState} from "react";
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

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

import { Avatar, Chip, Grid, IconButton, InputBase } from "@mui/material";

function createData(title, nature, startdate, enddate, status, owner) {
  return { title, nature, startdate, enddate, status, owner };
}

const status = ["Todo", "In Progress", "Completed", "Closed"];



const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(status, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(status) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TaskList({tasks, setTasks}) {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const createAvatar = (st) => {
    return st[0]
  }

  // useEffect(() => {
  //   if(tasks.length !== 0){
  //     console.log( "tasks",tasks)
  //     tasks.map(task => {
  //       setRows([
  //         ...rows,
  //           createData(
  //             task.name,
  //             task.nature,
  //             task.startTime,
  //             task.endTime,
  //             task.status,
  //             task.user !== null ? task.user : "Unassigned" 
  //           )
  //         ])
  //       })

  //     console.log(rows)
  //   } else {
  //     // rows.push(createData("No tasks", "", "", "", "", ""))
  //   }
  // }, [tasks])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Grid container spacing={5}>
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
            <TableCell align="center">Start-Date</TableCell>
            <TableCell align="center">End-Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length !== 0 ? tasks.map((row, ind) => (
            <TableRow
              key={ind}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={row.nature}
                  color={row.nature === "Bug" ? "error" : "warning"}
                />
              </TableCell>
              <TableCell align="center">{row.startTime}</TableCell>
              <TableCell align="center">{row.endTime}</TableCell>
              <TableCell align="center">
                {/* <Chip
                  label={row.status}
                  color={row.status === "todo" ? "primary" : "success"}
                /> */}
                <FormControl sx={{ m: 0.2, width: 150 }}>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    // multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        <Chip
                          label={row.status}
                          color={row.status === "todo" ? "primary" : "success"}
                        />
                      </Box>
                    )}
                    // MenuProps={MenuProps}
                  >
                    {status.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <Chip
                  color="secondary"
                  avatar={<Avatar> {row.user ? createAvatar(row.user) : createAvatar("Unassigned")} </Avatar>}
                  label={row.user ? row.user : "Unassigned"}
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
          )) : "NO TASKS"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
