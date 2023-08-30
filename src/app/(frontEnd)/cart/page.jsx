"use client";
import CartContext from "@/app/context/cartContext/CartContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import { addToCartHandler, decrementCartQuantity, removeCartItem } from "@/utilities/helperFunctions";



const page = () => {
  const { cartData, setCartData } = useContext(CartContext);
  console.log(cartData);




  return (
    <div className="container mx-auto my-5">
      {cartData.map((cartItem, Idx) => {
        return (
          <div
            key={cartItem._id}
            className={`flex justify-between items-center pb-3 ${
              Idx !== cartData.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <div className="text-xs font-mono font-medium">
              {cartItem.title}
            </div>
            {/* ::Items Qty Area:: */}
            <div>
              <h1 className="text-semibold font-semibold mb-4 text-center">
                TK.{" "}
                <span className="font-mono">
                  {cartItem.price * cartItem.quantity}
                </span>
              </h1>
              <div className="flex items-center justify-around">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold  rounded pb-1">
                  {cartItem.quantity === 1 ? (
                    <DeleteForeverIcon
                      sx={{ fontSize: 18 }}
                      onClick={() => removeCartItem(cartItem._id,cartData,setCartData,"cartItems")}
                    />
                  ) : (
                    <RemoveIcon
                      sx={{ fontSize: 15 }}
                      onClick={() => decrementCartQuantity(cartItem._id,cartData, setCartData,"cartItems")}
                    />
                  )}
                </button>
                <span className="mx-4 text-sm bg-slate-200 p-1 rounded font-semibold">
                  {cartItem.quantity}
                </span>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold  rounded pb-1">
                  <AddIcon
                    sx={{ fontSize: 15 }}
                    onClick={() => addToCartHandler(cartItem, cartData,setCartData, "cartItems")}
                  />
                </button>
              </div>
            </div>

            {/* :: Qty Area Ends :: */}
          </div>
        );
      })}
    </div>
  );
};

export default page;
