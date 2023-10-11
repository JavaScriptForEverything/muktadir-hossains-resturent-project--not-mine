"use client";
import CartContext from "@/app/context/cartContext/CartContext";
import React, { useContext } from "react";
import OrderSlip from "@/components/order-slip/OrderSlip";

const Page = () => {
  const { cartData, setCartData } = useContext(CartContext);
  console.log(cartData);

  return (
    <>
      <OrderSlip cartData={cartData}  setCartData={setCartData} keyName={"cartItems"}/>
    </>
  );
};

export default Page;
