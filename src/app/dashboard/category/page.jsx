"use client";
import React, { useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import DataTable from "@/components/muiComponents/DataTable";
import CreateCategoryModal from '@/components/muiComponents/CreateCategoryModal';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Colors from "@/assets/Colors";
import LoadingGraph from "@/components/small/LoadingGraph";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const { input, inputChangeHandler, setInput } = useInput({
    categoryName: "",
  });

  // Fetch all Categories::
  const fetchData = () => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setData(data.category);
      })
      .catch((err) => console.log(err));
  };

  // Create a new category::
  const handelSubmit = async (event, input) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/category/create`, input);
      if (response.status === 201) {
        setOpen(false);
        fetchData();
        setInput({ categoryName: "" });
        // Show success toast::
        toast.success("Category Added Successfully !!!", {
          style: {
            background: Colors.success,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      // Show success toast::
      toast.success(error.message, {
        style: {
          background: Colors.success,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ::Toaster:: */}
      <Toaster />
      <div className="flex justify-evenly align-middle mb-6">
        <div>
          <h2 className="text-center font-mono text-2xl text-primary-100 ">
            All Category
          </h2>
        </div>
        <div>
          <CreateCategoryModal
            handelSubmit={handelSubmit}
            open={open}
            setOpen={setOpen}
            inputChangeHandler={inputChangeHandler}
            input={input}
          />
        </div>
      </div>
      <hr />
      <br />
      {data.length > 0 ? (
        <DataTable data={data} fetchData={fetchData} />
      ) : (
        <LoadingGraph />
      )}
    </div>
  );
};

export default CategoryPage;
