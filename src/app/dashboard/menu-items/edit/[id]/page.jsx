"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/small/LoadingSpinner";
import useGetApiResponse from "@/hooks/useGetApiResponse";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Colors from "@/assets/Colors";

const EditItems = ({ params }) => {
  const itemId = params.id;
  const router = useRouter();
  const [inputObject, setInputObject] = useState({});
  const [img, setImg] = useState(null); //for Image Input field::

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputObject((prevState) => ({
      ...prevState, // spread the previous state
      [name]: value, // update the specific field based on name
    }));
  };

  const {
    data: menuItem,
    loading,
    error,
  } = useGetApiResponse(`/api/menu-items/${itemId}`);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetApiResponse(`/api/category`);

  useEffect(() => {
    setInputObject(menuItem?.data);
  }, [menuItem]);

  const fromHandler = async (e) => {
    e.preventDefault();

    try {

      console.log(inputObject);
      // Create A From Data Object::
      const fromData = new FormData();

      fromData.append("title", inputObject?.title);
      fromData.append("description", inputObject?.description);
      fromData.append("price", inputObject?.price);
      fromData.append("category", inputObject?.category);
      fromData.append("itemCode", inputObject?.itemCode);
      // If Image is selected::
      if (img) {
        fromData.append("image", img);
      }

      const response = await axios.post(`/api/menu-items/${itemId}`, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status) {
        toast.success("Menu Updated Successfully !", {
          style: {
            background: Colors.success,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
        router.push("/dashboard/menu-items");
      }
    } catch (error) {
      toast.error(error.message, {
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
    <div className="min-h-screen">
      <p className="title-main-dashboard">Edit Food Item</p>
      <div className="w-6/12 mx-auto">
        {loading && categoriesLoading ? (
          <LoadingSpinner />
        ) : (
          <form
            // method="POST"
            // encType="multipart/form-data"
            // action={`/api/menu-items/${itemId}`}
            className="pb-8"
            onSubmit={(e) => fromHandler(e)}
          >
            <div className="flex flex-col pt-2">
              <label htmlFor="title">Title</label>
              <input
                className="form-input-sm"
                type="text"
                name="title"
                id="title"
                defaultValue={inputObject?.title}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="flex flex-col pt-2">
              <label htmlFor="itemCode">Item Code</label>
              <input
                className="form-input-sm"
                type="text"
                name="itemCode"
                id="itemCode"
                defaultValue={inputObject?.itemCode}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="flex flex-col pt-2">
              <label htmlFor="category">Select Category</label>
              <select
                className="form-input-sm py-2"
                name="category"
                onChange={(e) => onChangeHandler(e)}
              >
                <option value={inputObject?.category}>-- select --</option>
                {categories?.category.map((cat) => {
                  const id = cat._id.toString();
                  return (
                    <option value={id} key={cat._id}>
                      {cat.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col pt-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-input-sm"
                type="text"
                name="description"
                id="description"
                defaultValue={inputObject?.description}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="flex flex-col pt-2">
              <label htmlFor="price">Price</label>
              <input
                className="form-input-sm"
                type="text"
                name="price"
                id="price"
                defaultValue={inputObject?.price}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="flex flex-col pt-2">
              <label className="text-primary-100 text-xs" htmlFor="image">
                Choose an Image
              </label>
              <input
                type="file"
                className="text-xs"
                name="image"
                id="image"
                onChange={(event) => setImg(event.target.files[0])}
              />
            </div>
            <button className="btn-dashboard-sm btn-dash-primary mt-2">
              Add Menu Item
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditItems;
