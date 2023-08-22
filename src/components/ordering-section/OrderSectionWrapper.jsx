"use client";
import React, { useState } from "react";
import MenuAreaWrapper from "../menuAreaWraper/MenuAreaWrapper";
import Cart from "../cart/Cart";
import SmallScreenCartBtn from "../cart/SmallScreenCartBtn";

const OrderSectionWrapper = ({ allFoodItems }) => {

  const [cartData, setCartData] = useState([]);
  // Show Cart Badge count Function::
  const getTotalCartItemsNumber = () => {
    let totalItems = 0;
    cartData.forEach((item) => {
      const count = item.quantity * 1;
      totalItems = totalItems + count;
    });
    return totalItems;
  };

  //Add Items to CART handler::
  const addToCartHandler = (product) => {
    const existingCartItem = cartData.find((item) => item._id === product._id);

    if (existingCartItem) {
      const updatedCartItems = cartData.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartData(updatedCartItems);
    } else {
      setCartData([...cartData, { ...product, quantity: 1 }]);
    }
  };

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
        addToCartHandler={addToCartHandler}
        allFoodItems={allFoodItems}
      />
      {/* Right Side Cart:: */}
      <Cart
        cartData={cartData}
        addToCartHandler={addToCartHandler}
        decrementCartQuantity={decrementCartQuantity}
        removeCartItem={removeCartItem}
      />

      {/* Small Screen Cart Button :: */}
      <SmallScreenCartBtn cartData={cartData} />

    </div>
  );
};

export default OrderSectionWrapper;
