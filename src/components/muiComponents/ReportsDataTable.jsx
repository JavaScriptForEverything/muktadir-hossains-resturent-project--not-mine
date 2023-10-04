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

export default function ReportsDataTable({
  data
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  // minWidth: 50,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Serial
              </TableCell>
              <TableCell
                align="left"
                style={{
                  // minWidth: 100,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Table
              </TableCell>
              <TableCell
                align="left"
                style={{
                  // minWidth: 150,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Sub Total
              </TableCell>
              <TableCell
                align="left"
                style={{
                  // minWidth: 100,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Discount
              </TableCell>
              <TableCell
                align="left"
                style={{
                  // minWidth: 100,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                VAT
              </TableCell>
              <TableCell
                align="left"
                style={{
                  // minWidth: 200,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Net Total
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
              <TableCell
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, Idx) => {
                const { orderStatus } = row;
                // Choose Order Status Color::
                let statusColor;
                switch (orderStatus) {
                  case "pending":
                    statusColor = "bg-lime-400";
                    break;
                  case "preparing":
                    statusColor = "bg-green-400";
                    break;
                  case "served":
                    statusColor = "bg-orange-500";
                    break;
                  case "paid":
                    statusColor = "bg-green-700 text-white";
                    break;
                  case "canceled":
                    statusColor = "bg-slate-900 text-white";
                    break;
                  default:
                    statusColor = "bg-slate-200";
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={1} key={Idx}>
                    <TableCell align="left">{Idx + 1}</TableCell>
                    <TableCell align="left">
                      <span className="bg-slate-300 p-1 rounded">
                        {row.tableCode ? row.tableCode : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell align="left">{row.subTotalPrice}</TableCell>
                    <TableCell align="left">{row.discount}</TableCell>
                    <TableCell align="left">{row.vat}</TableCell>
                    <TableCell align="left">{row.payableAmount}</TableCell>
                    <TableCell align="left">
                      <span className={`${statusColor} p-1 rounded text-xs`}>
                        {orderStatus.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
