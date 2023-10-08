// Food Item Modal::
"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";

// modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateMenuItemModal({ fetchAllMenuItems }) {
  const [open, setOpen] = React.useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [img, setImg] = useState(""); //for Image Input field::

  const initialInputObject = {
    title: "",
    description: "",
    price: "",
    category: "",
    itemCode: "",
  };
  const [input, setInput] = useState(initialInputObject);
  const handelModalToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await axios.get("/api/category");
        setAllCategory(response?.data?.category);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);




  const handelChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create A From Data Object::
      const fromData = new FormData();

      fromData.append("title", input.title);
      fromData.append("description", input.description);
      fromData.append("price", input.price);
      fromData.append("category", input.category);
      fromData.append("itemCode", input.itemCode);
      fromData.append("image", img);

      const response = await axios.post(
        "http://localhost:3000/api/menu-items",
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        fetchAllMenuItems();
        setInput(initialInputObject);
        setOpen(false);
      }
    } catch (error) {
      console.log("this is the error::", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="btn-dash-primary btn-dashboard-sm my-3"
          onClick={handelModalToggle}
        >
          Create Menu Item
        </button>
      </div>
      <Modal
        open={open}
        onClose={handelModalToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mx-auto w-1/2">
            <h2 className="text-violet-600 text-center text-xl font-semibold">
              Create New Menu
            </h2>
            <form className="pb-8">
              <div className="flex flex-col pt-2">
                <label htmlFor="title">Title</label>
                <input
                  className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                  type="text"
                  name="title"
                  id="title"
                  value={input.title}
                  onChange={handelChange}
                />
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="itemCode">Item Code</label>
                <input
                  className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                  type="text"
                  name="itemCode"
                  value={input.itemCode}
                  id="itemCode"
                  onChange={handelChange}
                />
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="category">Select Category</label>
                <select
                  className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                  name="category"
                  value={input.category}
                  onChange={handelChange}
                >
                  <option value="usa">--select--</option>
                  {allCategory.map((cat) => {
                    return (
                      <option value={cat._id} key={cat._id}>
                        {cat.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="description">Description</label>
                <textarea
                  className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                  type="text"
                  name="description"
                  id="description"
                  value={input.description}
                  onChange={handelChange}
                />
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="price">Price</label>
                <input
                  className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                  type="text"
                  name="price"
                  value={input.price}
                  id="price"
                  onChange={handelChange}
                />
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="image">Choose an Image</label>
                <input
                  type="file"
                  onChange={() => setImg(event.target.files[0])}
                  name="image"
                  id="image"
                />
              </div>
              <button
                onClick={() => handelSubmit(event)}
                className="bg-violet-500 text-white mt-5 hover:bg-violet-700 rounded-md px-2 py-2 mx-auto text-center"
              >
                Add Menu Item
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
