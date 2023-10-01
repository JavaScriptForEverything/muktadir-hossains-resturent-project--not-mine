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

export default function ReportsDataTable({ data, fetchData }) {
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
                  minWidth: 50,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Serial
              </TableCell>
              <TableCell
                align="left"
                style={{
                  minWidth: 100,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Table
              </TableCell>
              <TableCell
                align="left"
                style={{
                  minWidth: 150,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Platter Name
              </TableCell>
              <TableCell
                align="left"
                style={{
                  minWidth: 400,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Platter Name
              </TableCell>
              <TableCell
                align="left"
                style={{
                  minWidth: 200,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Actions
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, Idx) => {
                const { orderStatus } = row;
                let statusColor;
                switch (orderStatus) {
                  case "pending":
                    statusColor = "bg-red-300";
                    break;
                  case "preparing":
                    statusColor = "bg-red-500";
                    break;
                  case "served":
                    statusColor = "bg-orange-500";
                    break;
                  case "canceled":
                    statusColor = "bg-slate-400 text-white";
                    break;
                  case "paid":
                    statusColor = "bg-orange-300";
                    break;
                  default:
                    statusColor = "bg-slate-200";
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={1} key={Idx}>
                    <TableCell align="left">{Idx + 1}</TableCell>
                    <TableCell align="left">
                      <span className="bg-slate-200 p-1 rounded">
                        {row.tableCode ? row.tableCode : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell align="left">{row.discount}</TableCell>
                    <TableCell align="left">{row.payableAmount}</TableCell>
                    <TableCell align="left">{row.discount}</TableCell>
                    <TableCell align="left">
                      <span className={`${statusColor} p-1 rounded`}>
                        {orderStatus.toUpperCase()}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 150, 1000]}
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
