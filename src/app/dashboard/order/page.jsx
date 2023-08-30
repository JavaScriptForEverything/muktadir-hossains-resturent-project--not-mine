"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useDataFetching from "@/hooks/useDataFetching";

import { useEffect, useState } from "react";
import {
  addToCartHandler,
  decrementCartQuantity,
  removeCartItem,
} from "@/utilities/helperFunctions";
import toast, { Toaster } from "react-hot-toast";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Submit order Handler
  const submitOrderHandler = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const allSelectedItems = orderItems.map((i) => {
        return { ...i, foodItemUID: i._id };
      });
      const reqBody = {
        TableCode: tableNumber,
        orderItems: allSelectedItems,
      };
      const res = await axios.post("/api/order", reqBody);
      if (res.status === 200) {
        setOrderItems([]);
        setTableNumber(null);
        localStorage.setItem("adminOrder", JSON.stringify([]));
        // success toast::
        toast.success("Success! Here is your toast.", {
          style: {
            background: "green", // Background color for success toast
            color: "white", // Text color for success toast
          },
        });
      }
    } catch (error) {
      console.log(error);
      // Error TOast
      toast.error(`${error.message}`, {
        style: {
          background: "red", // Background color for success toast
          color: "white", // Text color for success toast
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const {
    data: tables,
    loading: tablesLoading,
    error: tablesError,
  } = useDataFetching("/api/table");
  const {
    data: foodItems,
    loading: foodItemsLoading,
    error: foodItemsError,
  } = useDataFetching("/api/menu-items");

  const tableData = tables?.allTables;
  const items = foodItems.data;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("adminOrder"))) {
      setOrderItems(JSON.parse(localStorage.getItem("adminOrder")));
    }
  }, []);

  return (
    <>
      <Toaster />
      <h2 className="text-center text-indigo-600 text-4xl font-medium">
        Manage All Orders
      </h2>
      <div className="w-8/12 mx-auto">
        <h3>Create An Order</h3>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            {/* Select Table Number:: */}
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={tableData}
              onChange={(event, newValue) => setTableNumber(newValue.tableCode)}
              sx={{ width: 350 }}
              getOptionLabel={(option) => `${option.tableCode}`}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option.tableCode}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="Select table number"
                  {...params}
                  label="Select Table"
                />
              )}
            />
            {/* Food Items */}
            <Autocomplete
              clearOnBlur={true}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={items}
              onChange={(event, newValue) =>
                addToCartHandler(
                  newValue,
                  orderItems,
                  setOrderItems,
                  "adminOrder"
                )
              }
              sx={{ width: 350 }}
              getOptionLabel={(option) =>
                `${option.itemCode} - ${option.title}`
              }
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option.title} - {option.itemCode}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="Select Dish"
                  {...params}
                  label="Select Dish"
                />
              )}
            />
          </div>
          <div>
            <button
              className="py-3 px-5 m-2 text-white rounded-md bg-red-500 hover:bg-red-600"
              onClick={(event) => submitOrderHandler(event)}
            >
              {!submitting ? "Submit" : "Submitting..."}
            </button>
          </div>
        </Box>
      </div>

      <h2 className="text-3xl text-center text-red-600">My ordered Items:</h2>
      <p>
        Table No. <b>{tableNumber}</b>
      </p>
      <div>
        {orderItems &&
          orderItems.map((item, Idx) => {
            return (
              <div
                key={item._id}
                className={`flex justify-between items-center pb-3 ${
                  Idx !== orderItems.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="text-xs font-mono font-medium">
                  {item.title}
                </div>
                {/* ::Items Qty Area:: */}
                <div>
                  <h1 className="text-semibold font-semibold mb-4 text-center">
                    TK.{" "}
                    <span className="font-mono">
                      {item.price * item.quantity}
                    </span>
                  </h1>
                  <div className="flex items-center justify-around">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold  rounded pb-1">
                      {item.quantity === 1 ? (
                        <DeleteForeverIcon
                          sx={{ fontSize: 18 }}
                          onClick={() =>
                            removeCartItem(
                              item._id,
                              orderItems,
                              setOrderItems,
                              "adminOrder"
                            )
                          }
                        />
                      ) : (
                        <RemoveIcon
                          sx={{ fontSize: 15 }}
                          onClick={() =>
                            decrementCartQuantity(
                              item._id,
                              orderItems,
                              setOrderItems,
                              "adminOrder"
                            )
                          }
                        />
                      )}
                    </button>
                    <span className="mx-4 text-sm bg-slate-200 p-1 rounded font-semibold">
                      {item.quantity}
                    </span>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold  rounded pb-1">
                      <AddIcon
                        sx={{ fontSize: 15 }}
                        onClick={() =>
                          addToCartHandler(
                            item,
                            orderItems,
                            setOrderItems,
                            "adminOrder"
                          )
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* :: Qty Area Ends :: */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrderPage;
