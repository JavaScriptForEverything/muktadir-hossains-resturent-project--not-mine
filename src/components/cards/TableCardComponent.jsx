"use client";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Groups2Icon from "@mui/icons-material/Groups2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Colors from "@/assets/Colors";

const TableCardComponent = ({ table, getAllTables }) => {
  // Update Booking::
  const bookingToggleHandler = async () => {
    const tableID = table._id;
    try {
      const response = await axios.post(`/api/table/${tableID}`);
      if (response.status) {
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
      }
    } catch (error) {
      // error toast::
      toast.success(error.message, {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
      console.error(error);
    }
  };

  // Table Delete:
  const deleteTableHandler = async () => {
    const tableID = table._id;
    try {
      const result = confirm(`Are you sure you want to delete this table?`);
      if (result) {
        const response = await axios.delete(`/api/table/${tableID}`);
        if (response.status) {
          // success toast::
          toast.success("Table Deleted Successfully !", {
            style: {
              background: Colors.success,
              color: Colors.black,
              borderRadius: 5,
            },
            duration: 3000,
          });
          getAllTables();
        } else {
          // cancel toast::
          toast.error("Operation Canceled !", {
            style: {
              background: Colors.success,
              color: Colors.black,
              borderRadius: 5,
            },
            duration: 3000,
          });
        }
      }
    } catch (error) {
      // error toast::
      toast.success(error.message, {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        table.isFree === "free" ? "bg-green-200" : "bg-red-200"
      } shadow-md w-1/3 m-3 text-center p-6 rounded-md table__body`}
      key={table._id}
    >
      <Toaster />
      <h5 className="text-3xl my-2">{table.tableCode}</h5>
      <h5>
        <Groups2Icon fontSize="large" /> &#8212;{" "}
        <strong className="text-lg">{table.tableCapacity}</strong>
      </h5>
      <p className="pt-3">Status: {table.isFree.toUpperCase()}</p>
      <button
        onClick={bookingToggleHandler}
        className={`bg-slate-700 px-3 py-2 mt-4 rounded-md text-white text-sm font-light font-mono shadow-sm shadow-black`}
      >
        {table.isFree !== "free" ? "Cancel Booking" : "Book Table"}
      </button>
      {/* Cross Icon */}
      <div
        className="absolute top-2 right-2 rounded-full cursor-pointer 
      hover:shadow-black
      hover:shadow-md
      hover:transition hover:delay-150 hover:duration-300 hover:ease-in-out
      "
        onClick={deleteTableHandler}
      >
        <HighlightOffIcon style={{ color: "red" }} />
      </div>
    </div>
  );
};

export default TableCardComponent;
