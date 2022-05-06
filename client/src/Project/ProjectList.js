import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Checkbox, Chip } from "@mui/material";

function createData(title, key, deadline, status, owner) {
  return { title, key, deadline, status, owner };
}

const rows = [
  createData("Web Development", "WD-2022", 6.0, "todo", "John Doe"),
  createData("Speed Programming", "SP-2022", 9.0, "completed", "John Doe"),
  createData("Data Science", "DS-2022", 16.0, "closed", "Sami"),
];

export default function ProjectList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Key</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //   checked={isItemSelected}
                  //   inputProps={{
                  //     'aria-labelledby': labelId,
                  //   }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.key}</TableCell>
              <TableCell align="center">{row.deadline}</TableCell>
              <TableCell align="center">
                <Chip label={row.status} color="primary" variant="outlined" />
              </TableCell>
              <TableCell align="center">
                <Chip avatar={<Avatar>M</Avatar>} label={row.owner} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
