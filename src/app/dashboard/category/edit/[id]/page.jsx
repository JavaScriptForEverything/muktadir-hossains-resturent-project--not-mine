import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import React from "react";

connectToDB();

const EditCategory = async ({ params }) => {
  const categoryId = params.id;
  const category = await Category.findOne({ _id: categoryId });

  // const handelSubmit =(event)=>{
  //   event.preventDefault();
  //   console.log('Test handelSubmit')
  // }

  return (
    <div className="min-h-screen">
      <form
        method="GET"
        action={`/api/category/${categoryId}`}
        // onSubmit={(e)=>handelSubmit(e)}
        className="w-6/12 mx-auto border border-slate-500 p-8 rounded-lg shadow-lg shadow-slate-600"
      >
        <h2 className="text-center text-xl text-violet-600 my-3">
          Edit Category Name
        </h2>
        <div>
          <input
            className="mt-1 p-2 block w-full rounded-md border-grey-500 border-2
                focus:ring-green-500 placeholder:grey-500::placeholder text-sm "
            type="text"
            name="categoryName"
            defaultValue={category.categoryName}
          />

          <button className="block btn btn-dash-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
