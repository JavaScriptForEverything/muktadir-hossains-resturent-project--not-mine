"use client";
import Image from "next/image";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCartHandler } from "@/utilities/helperFunctions";
import { useContext } from "react";
import CartContext from "@/app/context/cartContext/CartContext";

const FoodItemCard = ({ item }) => {
  const {cartData,setCartData} = useContext(CartContext)

  const { title, description, price, images, _id: id } = item;
  const imgUrl = images[0].replace("http://localhost:3000", "");
  return (
  
      <div className="flex align-middle relative bg-white shadow-sm shadow-black rounded-md overflow-hidden">
        <div className="overflow-hidden w-4/12">
          <Image src={imgUrl}
          className="h-full  rounded-none hover:scale-110  hover:ease-in duration-300"
          height={500}
          width={500}
          alt={title} />
        </div>
        <div className="ml-2 w-8/12 py-4">
          <h2 className="text-lg font-bold text-red-500">
            {title.length < 20 ? title : `${title.slice(0, 17)}...`}
          </h2>
          <p className="text-xs text-slate-500 font-normal pb-1 pr-1">
            {description.length < 70
              ? description
              : `${description.slice(0, 70)}...`}
          </p>
          <p>
            <span className="font-semibold ">Tk: </span>
            <strong className="font-mono">{price}</strong>
          </p>
        </div>
      <div className="absolute right-2 bottom-2 addIcon ring-1 ring-red-700 rounded-full">
        <IconButton
          color="error"
          size="small"
          aria-label="add to shopping cart"
          onClick={() => addToCartHandler(item,cartData,setCartData)}
        >
          <AddShoppingCartIcon sx={{ fontSize: 16 }}/>
          {/* <AddIcon fontSize="small" /> */}
        </IconButton>
      </div>
      </div>
  );
};

export default FoodItemCard;
