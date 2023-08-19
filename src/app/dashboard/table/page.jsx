"use client";
import TableCardComponent from "@/components/TableCardComponent";
import useInput from "@/hooks/useInput";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Table = () => {
  const [allTables, setAllTables] = useState([]);

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

  const primaryInput = {
    tableCode: "",
    tableCapacity: "",
    isFree: "",
  };
  const { input, inputChangeHandler, setInput } = useInput({ primaryInput });

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
      if (res.status === 200) {
        setInput(primaryInput);
        getAllTables();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-4xl text-center">Add New Table</h2>
        <form className="w-8/12 mx-auto">
          <div className="flex flex-col pt-2">
            <label htmlFor="tableCode">Table Code (Table Name)</label>
            <input
              className="border border-gray-300 px-3 py-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
              type="text"
              name="tableCode"
              id="tableCode"
              onChange={() => inputChangeHandler(event)}
              value={input.tableCode}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="capacity">Table Capacity</label>
            <input
              className="border border-gray-300 px-3 py-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
              type="text"
              name="tableCapacity"
              id="capacity"
              value={input.tableCapacity}
              onChange={() => inputChangeHandler(event)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="capacity">Is Free</label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
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
            className="bg-violet-500 text-white font-medium mt-5 hover:bg-violet-700 rounded-sm px-2 py-2 mx-auto text-center shadow-sm shadow-violet-950 "
          >
            Add Table
          </button>
        </form>
      </div>
      <hr className="my-6" />
      {allTables.length>0 && (
        <div className="flex justify-evenly flex-wrap border border-solid border-slate-600 py-5">
          {allTables.map((table) => (
            <TableCardComponent table={table} />
          ))}
        </div>
      )}
    </>
  );
};

export default Table;
