import React, { useEffect, useState } from 'react';
import CartContext from './CartContext';


const cartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  
  useEffect(()=>{
    setCartData(JSON.parse(localStorage.getItem("cartItems")))
  },[])
  
    return (
      <CartContext.Provider value={{ cartData, setCartData }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export default cartContextProvider;