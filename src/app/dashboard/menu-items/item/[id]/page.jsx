import Category from "@/models/categoryModel";
import MenuItems from "@/models/menuItemsModel";
import Image from "next/image";
import React from "react";

const MenuItemDataTable = async ({ params }) => {
  const itemId = params.id;
  const foodItem = await MenuItems.findById(itemId);
  //   Destructure Food Item Data::
  const { title, itemCode, price, images, category ,description} = foodItem;

  const { categoryName } = (await Category.findById(category)) || "N/A";

  return (
    <div className="min-h-screen">
      <h2 className="title-main-dashboard"> {title}</h2>
      <div className="w-[380px] mx-auto my-10">
        {/* <Image
          src={images[0].replace("http://localhost:3000", "")}
          height={380}
          width={380}
          alt={title}
        /> */}
        <img src={images[0].replace("http://localhost:3000", "")} />
      </div>

      <div className="relative overflow-x-auto light">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-black uppercase bg-slate-300 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item name
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {title}
              </th>
              <td className="px-6 py-4">{itemCode}</td>
              <td className="px-6 py-4">{categoryName}</td>
              <td className="px-6 py-4">{description}</td>
              <td className="px-6 py-4">{price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuItemDataTable;
