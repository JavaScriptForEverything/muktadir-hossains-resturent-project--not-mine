"use client";
import React, { useState, useEffect } from "react";
import TableCardComponent from "@/components/cards/TableCardComponent";
import LoadingSpinner from "@/components/small/LoadingSpinner";
import useInput from "@/hooks/useInput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Colors from "@/assets/Colors";

const Table = () => {
  const [allTables, setAllTables] = useState([]);

  // Get all tables data from server::
  const getAllTables = async () => {
    try {
      const allTables = await axios.get("/api/table");
      setAllTables(allTables?.data?.allTables);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTables();
  }, []);
  // Primary Input Object::
  const primaryInput = {
    tableCode: "",
    tableCapacity: "",
    isFree: "",
  };
  const { input, inputChangeHandler, setInput } = useInput({ primaryInput });

  // On submit Handler::
  const onSubmitHandler = async () => {
    event.preventDefault();
    console.log(input);
    if (!input.tableCode && !input.tableCapacity) {
      alert("Please Fill all the required fields properly!");
      return;
    }
    try {
      const res = await axios.post("/api/table", input);
      console.log(res);
      if (res.data.success) {
        setInput(primaryInput);
        // success toast::
        toast.success("Status Updated Successfully !", {
          style: {
            background: Colors.success,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
        getAllTables();
      } else {
        // error toast::
        const message =  "Duplicate Field Detected !"  ||res.data.message;
        toast.error(message, {
          style: {
            background: Colors.error,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      // error toast::
      toast.error(error.message, {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="bg-white w-6/12 mx-auto px-8 py-5 rounded-3xl">
        <h2 className="title-main-dashboard">Add New Table</h2>
        <form>
          <div className="flex flex-col pt-2">
            <label className="pl-2" htmlFor="tableCode">
              Table Code (Table Name)
            </label>
            <input
              className="form-input-sm "
              type="text"
              name="tableCode"
              id="tableCode"
              onChange={() => inputChangeHandler(event)}
              value={input.tableCode}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label className="pl-2" htmlFor="capacity">
              Table Capacity
            </label>
            <input
              className="form-input-sm "
              type="text"
              name="tableCapacity"
              id="capacity"
              value={input.tableCapacity}
              onChange={() => inputChangeHandler(event)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label className="pl-2" htmlFor="capacity">
              Is Free
            </label>
            <select
              className="form-input-sm py-2"
              name="isFree"
              value={input.isFree}
              onChange={() => inputChangeHandler(event)}
            >
              <option>--select--</option>
              <option value="free">Free</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <button
            onClick={() => onSubmitHandler(event)}
            className="btn-dash-primary btn-dashboard-sm my-2"
          >
            Add Table
          </button>
        </form>
      </div>
      <hr className="my-6" />
      {allTables.length > 0 ? (
        <div className="flex justify-evenly flex-wrap border border-solid border-slate-600 py-5">
          {allTables.map((table) => (
            <TableCardComponent
              getAllTables={getAllTables}
              key={table.tableCode}
              table={table}
            />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Table;
