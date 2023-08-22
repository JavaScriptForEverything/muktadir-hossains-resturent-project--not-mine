"use client";
import React from "react";
import CartContextProvider from "./cartContext/CartContextProvider";

const ContextWrapper = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default ContextWrapper;
