"use client";
import DataTable from "@/components/muiComponents/DataTable";
import CreateCategoryModal from "@/components/muiComponents/createCategoryModal";
import useInput from "@/hooks/useInput";
import axios from "axios";
import React, { useEffect, useState } from "react";

const categoryPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const {input, inputChangeHandler, setInput} = useInput({categoryName:""});

  const fetchData = () => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {setData(data.category)
      })
      .catch((err) => console.log(err));
  };

  const handelSubmit = async (event, input) => {
    event.preventDefault();
    const response = await axios.post(`/api/category/create`, input);
    if (response.status === 201) {
      setOpen(false);
      fetchData();
      setInput({categoryName:""})
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-evenly align-middle mb-6">
        <div>
          <h2 className="text-center  text-3xl text-violet-600 ">
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
      <DataTable data={data} fetchData={fetchData}/>
    </>
  );
};

export default categoryPage;
