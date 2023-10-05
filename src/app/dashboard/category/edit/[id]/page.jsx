import Category from "@/models/categoryModel";
import React from "react";

const EditCategory = async ({ params }) => {
  const categoryId = params.id;
  const category = await Category.findOne({ _id: categoryId });
  console.log(category);

  return (
    <div className="min-h-screen">
      <form
        method="POST"
        className="w-6/12 mx-auto border border-slate-500 p-8 rounded-lg shadow-lg shadow-slate-600"
      >
        <h2 className="text-center text-xl text-violet-600">
          Edit Category Name
        </h2>
        <div className="">
          <label htmlFor="categoryName"></label>
          <input
            className="mt-1 p-2 block w-full rounded-md border-grey-500 border-2
                focus:ring-green-500 placeholder:grey-500::placeholder text-sm "
            type="text"
            name="categoryName"
            id="categoryName"
            value={category.categoryName}
          />
          <input
            className="block btn btn-dash-primary"
            type="button"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
