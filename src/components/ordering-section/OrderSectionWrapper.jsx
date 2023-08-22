"use client";
import React, { useContext, useState } from "react";
import MenuAreaWrapper from "../menuAreaWraper/MenuAreaWrapper";
import Cart from "../cart/Cart";
import SmallScreenCartBtn from "../cart/SmallScreenCartBtn";
import CartContext from "@/app/context/cartContext/CartContext";

const OrderSectionWrapper = ({ allFoodItems }) => {
  const { cartData, setCartData } = useContext(CartContext);

  // Decrement cart item quantity Handler::
  const decrementCartQuantity = (productId) => {
    const updatedCartItems = cartData.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: Math.max(0, item.quantity - 1), // Ensure quantity doesn't go below 0
        };
      }
      return item;
    });
    setCartData(updatedCartItems);
  };

  // Remove Items form CART::
  const removeCartItem = (productId) => {
    const updatedCartItems = cartData.filter((item) => item._id !== productId);
    setCartData(updatedCartItems);
  };

  return (
    <div className="flex justify-between ">
      {/* All Food Items category:: */}
      <MenuAreaWrapper
        allFoodItems={allFoodItems}
      />
      {/* Right Side Cart:: */}
      <Cart
        setCartData={setCartData}
        cartData={cartData}
      />
      {/* Small Screen Cart Button :: */}
      <SmallScreenCartBtn cartData={cartData} />
    </div>
  );
};

export default OrderSectionWrapper;
