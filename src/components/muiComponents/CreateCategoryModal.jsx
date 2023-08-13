"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function CreateCategoryModal({handelSubmit,open, setOpen,inputChangeHandler,input}) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button
        className="bg-violet-600 hover:bg-violet-800 py-2 px-2 rounded-lg text-white"
        onClick={handleOpen}
      >
        Create Category
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md">
          <form className="flex justify-center items-center flex-col" onSubmit={()=>handelSubmit(event,input)}>
            <div className="flex flex-col w-1/2">
              <label htmlFor="categoryName" className="text-2xl">Category Name</label>
              <input
                className="mt-1 p-2 block w-full rounded-md border-grey-500 border-2
                focus:ring-green-500 placeholder:grey-500::placeholder text-sm"
                placeholder="Enter Category Name ..."
                type="text"
                name="categoryName"
                id="categoryName"
                value={input.categoryName}
                onChange={inputChangeHandler}
              />
            </div>

            <button  className="bg-violet-500 hover:bg-violet-600 w-1/4 mt-5 py-2 px-2 rounded-md block text-white text-sm">
              Add Category
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
