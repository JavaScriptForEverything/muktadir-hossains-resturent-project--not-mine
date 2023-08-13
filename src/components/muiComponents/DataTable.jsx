"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// For Icons::
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import axios from "axios";

export default function DataTable({ data, fetchData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // delete Category Handler::
  const deleteCategoryHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);
      if (res.status === 200) {
        fetchData();
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleButtonClick = (rowId) => {
    // Implement your desired action here for the buttons
    alert(`Button clicked for row with ID: ${rowId}`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  minWidth: 100,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Serial No.
              </TableCell>
              <TableCell
                align="left"
                style={{
                  minWidth: 400,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Platter Name
              </TableCell>
              <TableCell
                align="center"
                style={{
                  minWidth: 200,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, Idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={1} key={Idx}>
                    <TableCell align="left">{Idx + 1}</TableCell>
                    <TableCell align="left">{row.categoryName}</TableCell>
                    <TableCell
                      style={{
                        minWidth: 200,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <IconButton
                        onClick={() => handleButtonClick(row._id)}
                        aria-label="view"
                        size="large"
                      >
                        <VisibilityIcon color="success" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleButtonClick(row._id)}
                        aria-label="view"
                        size="large"
                      >
                        <SaveAsRoundedIcon color="warning" />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteCategoryHandler(row._id)}
                        aria-label="view"
                        size="large"
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 1000]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
