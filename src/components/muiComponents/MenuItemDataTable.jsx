// @Food Item Table::
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
import Colors from "@/assets/Colors";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function MenuItemDataTable({ data, fetchAllMenuItems }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // delete Menu Items Handler::
  const deleteMenuItemHandler = async (id) => {
    const result = confirm("Are you sure you want to delete this item?");
    if (result === true) {
      try {
        const res = await axios.delete(`/api/menu-items/${id}`);
        if (res.status === 200) {
          fetchAllMenuItems();
          // Show success toast::
          toast.success("Item Deleted Successfully !!!", {
            style: {
              background: Colors.success,
              color: Colors.black,
              borderRadius: 5,
            },
            duration: 3000,
          });
        }
      } catch (error) {
        // Show Cancel toast::
        toast.error(error.message, {
          style: {
            background: Colors.error,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
      }
    } else {
      // Show Cancel toast::
      toast.error("Operation Canceled!!!", {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
    }
  };

  // Row Style
  const rowStyles = {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.primary,
  };

  return (
    <>
    <Toaster/>
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={rowStyles}>
                Serial No.
              </TableCell>
              <TableCell align="left" style={rowStyles}>
                Item Name
              </TableCell>
              <TableCell align="left" style={rowStyles}>
                Item Code
              </TableCell>
              <TableCell align="left" style={rowStyles}>
                Price
              </TableCell>
              <TableCell align="center" style={rowStyles}>
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
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.itemCode}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell
                      style={{
                        minWidth: 200,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Link href={`/dashboard/menu-items/item/${row._id}`}>
                        <IconButton aria-label="view" size="large">
                          <VisibilityIcon color="success" />
                        </IconButton>
                      </Link>
                      <Link href={`/dashboard/menu-items/edit/${row._id}`}>
                        <IconButton
                          // onClick={() => handleButtonClick(row._id)}
                          aria-label="view"
                          size="large"
                        >
                          <SaveAsRoundedIcon color="warning" />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => deleteMenuItemHandler(row._id)}
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
    </>
  );
}
