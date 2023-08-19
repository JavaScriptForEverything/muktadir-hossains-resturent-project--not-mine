"use client";
import Image from "next/image";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from '@mui/icons-material/Add';

const FoodItemCard = ({ item ,addToCartHandler}) => {
  const { title, description, price, images, _id: id } = item;
  const imgUrl = images[0].replace("http://localhost:3000", "");
  return (
    <div className="shadow-lg bg-white py-5 px-3 rounded-md  overflow-hidden relative">
      <div className="flex justify-evenly align-middle">
        <div className="overflow-hidden p-2 h-2/6 w-4/12">
          <Image
            className="rounded-md hover:scale-110  hover:ease-in duration-300"
            src={imgUrl}
            height={100}
            width={100}
            alt={title}
          />
        </div>
        <div className="ml-2">
          <h2 className="text-lg font-bold text-red-500">
            {title.length < 20 ? title : `${title.slice(0, 17)}...`}
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            {description.length < 70
              ? description
              : `${description.slice(0, 70)}...`}
          </p>
          <p>
            <span className="font-semibold">TK: </span>
            <strong>{price}</strong>
          </p>
        </div>
      </div>
      <div className="absolute right-2 bottom-2 addIcon ring-1 ring-red-700 rounded-full">
        <IconButton
          color="error"
          size="small"
          aria-label="add to shopping cart"
          onClick={() => addToCartHandler(item)}
        >
          <AddShoppingCartIcon sx={{ fontSize: 16 }}/>
          {/* <AddIcon fontSize="small" /> */}
        </IconButton>
      </div>
    </div>
  );
};

export default FoodItemCard;
