'use client'
import { calculateSubtotal } from "@/utilities/helperFunctions";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SmallScreenCartBtn = ({ cartData }) => {
  // Show Cart Badge count Function::
  const getTotalCartItemsNumber = () => {
    let totalItems = 0;
    cartData.forEach((item) => {
      const count = item.quantity * 1;
      totalItems = totalItems + count;
    });
    return totalItems;
  };

  return (
    <div className=" rounded-md md:hidden fixed w-full  bottom-1 left-0 bg-red-500 flex justify-between items-center px-10 py-5">
      <Badge
        badgeContent={cartData.length > 0 ? getTotalCartItemsNumber() : 0}
        color="primary"
      >
        <ShoppingCartIcon color="action" />
      </Badge>
      <button className="text-xl font-mono ring-2 ring-white px-3 py-2 rounded-md text-white shadow-md  shadow-black hover:shadow-2xl ">
        View Cart
      </button>
      <p>tk {calculateSubtotal(cartData)}</p>
    </div>
  );
};

export default SmallScreenCartBtn;
