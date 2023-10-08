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
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Colors from "@/assets/Colors";
import Link from "next/link";

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
    const result = confirm("Are you sure you want to delete this item?");
    if (result === true) {
      // Code to execute if the user clicks OK (result is true)
      try {
        const res = await axios.delete(`/api/category/${id}`);
        if (res.status === 200) {
          fetchData();
          // Show success toast::
          toast.success("Category Deleted Successfully !!!", {
            style: {
              background: Colors.success,
              color: Colors.black,
              borderRadius: 5,
            },
            duration: 3000,
          });
        }
      } catch (error) {
        alert(error.message);
        // Show Cancel toast::
        toast.error("Operation Failed!!!", {
          style: {
            background: Colors.error,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
      }
    } else {
      // Code to execute if the user clicks Cancel (result is false)
      toast.success("Operation Canceled!!!", {
        style: {
          background: Colors.success,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
    }
  };



  return (
    <>
      <Toaster />
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ height: 40 }}>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: Colors.primary,
                  }}
                >
                  Serial No.
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: Colors.primary,
                  }}
                >
                  Platter Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: Colors.primary,
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
                    <TableRow
                      hover
                      role="checkbox"
                      key={Idx}
                      tabIndex={1}
                      style={{ height: 20 }}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{Idx + 1}</TableCell>
                      <TableCell align="left">{row.categoryName}</TableCell>
                      {/* Modal Here:: */}
                      <TableCell
                        style={{
                          minWidth: 200,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                        align="center"
                      >
                        <Link href={`/dashboard/category/edit/${row._id}`}>
                          <IconButton aria-label="view" size="large">
                            <SaveAsRoundedIcon color="warning" />
                          </IconButton>
                        </Link>

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
          rowsPerPageOptions={[10, 25, 100, 500, 1000]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
