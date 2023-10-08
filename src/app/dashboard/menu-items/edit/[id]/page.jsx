// "use client";
// import useGetApiResponse from "@/hooks/useGetApiResponse";
// import React from "react";

// const EditItems = ({ params }) => {
//   const itemId = params.id;

//   const {
//     data: menuItem,
//     loading,
//     error,
//   } = useGetApiResponse(`/api/menu-items/${itemId}`);

//   const {
//     data:foodCategory ,
//     loading: categoryLoading,
//     error:categoryError,
//   } = useGetApiResponse(`/api/menu-items/${itemId}`);

//   const { title, itemCode, price, images, category, description } = menuItem;

//   console.log(menuItem);

//   // // GET all items ::
//   // const { title, itemCode, price, images, category, description } = await MenuItems.findById(itemId);
//   // // Get all Categories::
//   // const allCategory = await Category.find(category);
//   // const {categoryName,_id} = await Category.findById(category)|| "";

//   // console.log("Selected ID :",selectedCategory)

//   return (
//     <div className="min-h-screen">
//       {/* <p className="title-main-dashboard">Edit Food Item</p>
//       <div className="w-6/12 mx-auto">
//         <form 
//         method="POST" 
//         encType="multipart/form-data"
//         action={`/api/menu-items/${itemId}`}
//         className="pb-8" 
//         >
//           <div className="flex flex-col pt-2">
//             <label htmlFor="title">Title</label>
//             <input
//               className="form-input-sm"
//               type="text"
//               name="title"
//               id="title"
//               defaultValue={title}

//             />
//           </div>
//           <div className="flex flex-col pt-2">
//             <label htmlFor="itemCode">Item Code</label>
//             <input
//               className="form-input-sm"
//               type="text"
//               name="itemCode"
//               id="itemCode"
//               defaultValue={itemCode}
//             />
//           </div>
//           <div className="flex flex-col pt-2">
//             <label htmlFor="category">Select Category</label>
//             <select
//               className="form-input-sm py-2"
//               name="category"
//             >
//               <option value={_id.toString()}>-- select --</option>
//               {allCategory.map((cat) => {
//                 const id = cat._id.toString();
//                 return (
//                   <option value={id} key={cat._id}>
//                     {cat.categoryName}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="flex flex-col pt-2">
//             <label htmlFor="description">Description</label>
//             <textarea
//               className="form-input-sm"
//               type="text"
//               name="description"
//               id="description"
//               defaultValue={description}
//             />
//           </div>
//           <div className="flex flex-col pt-2">
//             <label htmlFor="price">Price</label>
//             <input
//               className="form-input-sm"
//               type="text"
//               name="price"
//               id="price"
//               defaultValue={price}
//             />
//           </div>
//           <div className="flex flex-col pt-2">
//             <label className="text-primary-100 text-xs" htmlFor="image">
//               Choose an Image
//             </label>
//             <input type="file" className="text-xs" name="image" id="image" />
//           </div>
//           <button className="btn-dashboard-sm btn-dash-primary mt-2">
//             Add Menu Item
//           </button>
//         </form>
//       </div> */}
//     </div>
//   );
// };

// export default EditItems;

// 'use client'
import React from "react";
import Category from "@/models/categoryModel";
import MenuItems from "@/models/menuItemsModel";

const EditItems = async ({ params }) => {
  const itemId = params.id;
  // GET all items ::
  const { title, itemCode, price, images, category, description } = await MenuItems.findById(itemId);
  // Get all Categories::
  const allCategory = await Category.find(category);
  const {categoryName,_id} = await Category.findById(category)|| "";

  // console.log("Selected ID :",selectedCategory)

  return (
    <div className="min-h-screen">
      <p className="title-main-dashboard">Edit Food Item</p>
      <div className="w-6/12 mx-auto">
        <form
        method="POST"
        encType="multipart/form-data"
        action={`/api/menu-items/${itemId}`}
        className="pb-8"
        >
          <div className="flex flex-col pt-2">
            <label htmlFor="title">Title</label>
            <input
              className="form-input-sm"
              type="text"
              name="title"
              id="title"
              defaultValue={title}

            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="itemCode">Item Code</label>
            <input
              className="form-input-sm"
              type="text"
              name="itemCode"
              id="itemCode"
              defaultValue={itemCode}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="category">Select Category</label>
            <select
              className="form-input-sm py-2"
              name="category"
            >
              <option value={_id.toString()}>-- select --</option>
              {allCategory.map((cat) => {
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
              defaultValue={description}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="price">Price</label>
            <input
              className="form-input-sm"
              type="text"
              name="price"
              id="price"
              defaultValue={price}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label className="text-primary-100 text-xs" htmlFor="image">
              Choose an Image
            </label>
            <input type="file" className="text-xs" name="image" id="image" />
          </div>
          <button className="btn-dashboard-sm btn-dash-primary mt-2">
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItems;
