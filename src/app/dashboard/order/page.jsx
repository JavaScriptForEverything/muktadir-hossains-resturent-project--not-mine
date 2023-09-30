"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useDataFetching from "@/hooks/useDataFetching";
import { addToCartHandler } from "@/utilities/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Colors from "@/assets/Colors";
import OrderSlip from "@/components/order-slip/OrderSlip";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [numberOfGuest, setNumberOfGuest] = useState(1);

  // Submit order Handler
  const submitOrderHandler = async (event) => {
    event.preventDefault();

    if (orderItems.length < 1) {
      // warning Toast
      toast.error(`Sorry !, No Dish Selected.`, {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
      return;
    }
    try {
      setSubmitting(true);
      const allSelectedItems = orderItems.map((i) => {
        return { ...i, foodItemUID: i._id };
      });
      const reqBody = {
        tableCode: tableNumber,
        orderItems: allSelectedItems,
        numberOfGuest,
        orderStatus: "paid",
      };
      const res = await axios.post("/api/order", reqBody);
      if (res.status === 200) {
        setOrderItems([]);
        setTableNumber(null);
        localStorage.setItem("adminOrder", JSON.stringify([]));
        // success toast::
        toast.success(res?.data?.message, {
          style: {
            background: Colors.success,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      // Error TOast
      toast.error(`${error.message}`, {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
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
  const items = foodItems?.data;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("adminOrder"))) {
      setOrderItems(JSON.parse(localStorage.getItem("adminOrder")));
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className="">
        <div className="mx-auto">
          <h2 className="text-center text-indigo-600 text-4xl font-medium mb-2">
            Create An Order
          </h2>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Select Table Number:: */}
              <Autocomplete
                disabled={tablesLoading}
                size="small"
                disablePortal
                id="combo-box-table-number"
                options={tables?.allTables}
                onChange={(event, newValue) =>
                  setTableNumber(newValue.tableCode)
                }
                sx={{ width: 300 }}
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
                disabled={foodItemsLoading}
                size="small"
                disablePortal
                id="combo-box-food-item-selector"
                options={foodItems?.data}
                onChange={(event, newValue) =>
                  addToCartHandler(
                    newValue,
                    orderItems,
                    setOrderItems,
                    "adminOrder"
                  )
                }
                sx={{ width: 300 }}
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
              {/* Number of Guest */}
              <TextField
                required
                sx={{ width: 300 }}
                size="small"
                id="outlined-required"
                label="Number of Guest"
                defaultValue={1}
                onChange={(e) => setNumberOfGuest(Number(e.target.value))}
              />
              {/* Order Date */}
              <TextField
                disabled
                sx={{ width: 300 }}
                size="small"
                id="outlined-required"
                label="Order Date"
                defaultValue={new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            </div>
          </Box>
        </div>

        <div className="">
          {orderItems.length > 0 && (
            <OrderSlip
              cartData={orderItems}
              setCartData={setOrderItems}
              keyName={"adminOrder"}
              adminOrderSlip={true}
              submitOrderHandler={submitOrderHandler}
            />
          )}
        </div>
        <div className="flex justify-center mt-2 ">
          <button
            className="py-2 px-3 m-2 text-white rounded-md bg-red-500 hover:bg-red-600"
            onClick={(event) => submitOrderHandler(event)}
          >
            {!submitting ? "Submit" : "Submitting..."}
          </button>
        </div>
      </div>

      {/* <p>
        Table No. <b>{tableNumber}</b>
      </p> */}
    </>
  );
};

export default OrderPage;
