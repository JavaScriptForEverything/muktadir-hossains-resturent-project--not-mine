"use client";
import React, { useContext, useEffect, useState } from "react";
import MenuAreaWrapper from "../menuAreaWraper/MenuAreaWrapper";
import Cart from "../cart/Cart";
import SmallScreenCartBtn from "../cart/SmallScreenCartBtn";
import CartContext from "@/app/context/cartContext/CartContext";


const OrderSectionWrapper = ({ allFoodItems }) => {
  const { cartData, setCartData } = useContext(CartContext);

  return (
    <div className="flex justify-between dark:bg-hero-pattern">
      {/* All Food Items category:: */}
      <MenuAreaWrapper allFoodItems={allFoodItems} />
      {/* Right Side Cart:: */}
      <Cart setCartData={setCartData} cartData={cartData} />
      {/* Small Screen Cart Button :: */}
      <SmallScreenCartBtn cartData={cartData} />
    </div>
  );
};

export default OrderSectionWrapper;
