"use client"
import React, { useState } from 'react'
import MenuAreaWrapper from '../menuAreaWraper/MenuAreaWrapper'
import Cart from '../cart/Cart'

const OrderSectionWrapper = ({allFoodItems}) => {


    const [cartData, setCartData] = useState([])

    const addToCartHandler = (product)=>{
        const existingCartItem = cartData.find(item => item._id === product._id);

        if (existingCartItem) {
          const updatedCartItems = cartData.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartData(updatedCartItems);
        } else {
            setCartData([...cartData, { ...product, quantity: 1 }]);
        }
        console.log(cartData)
    }
  return (
    <div className="flex justify-between">
    <MenuAreaWrapper addToCartHandler={addToCartHandler} allFoodItems={allFoodItems} />
    <Cart cartData={cartData}  setCartData={setCartData}/>
  </div>
  )
}

export default OrderSectionWrapper