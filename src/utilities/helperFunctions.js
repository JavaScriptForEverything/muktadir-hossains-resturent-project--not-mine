// Calculate Sub total Function for CART::
export const calculateSubtotal = (cartData) => {
  return cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Add to cart Handler::
export const addToCartHandler = (product, cartData, setCartData) => {
  const existingCartItem = cartData.find((item) => item._id === product._id);

  if (existingCartItem) {
    const updatedCartItems = cartData.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    console.log("add to local storage")
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartData(updatedCartItems);
  } else {
    localStorage.setItem("cartItems", JSON.stringify([...cartData, { ...product, quantity: 1 }]));
    setCartData([...cartData, { ...product, quantity: 1 }]);
  }
};

// Remove Items form CART::
export const removeCartItem = (productId,cartData,setCartData) => {
  const updatedCartItems = cartData.filter((item) => item._id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  setCartData(updatedCartItems);
};

// Decrement cart item quantity Handler::
export const decrementCartQuantity = (productId, cartData, setCartData) => {
  const updatedCartItems = cartData.map((item) => {
    if (item._id === productId) {
      return {
        ...item,
        quantity: Math.max(0, item.quantity - 1), // Ensure quantity doesn't go below 0
      };
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  setCartData(updatedCartItems);
};

// Calculate net payable Amount ::
export const calculatePayableAmount = (
  subtotal,
  vat,
  discount,
  discountType
) => {
  if (subtotal === 0) {
    return 0;
  }
  if (discountType === "fixed") {
    return Math.ceil(subtotal + vat - discount);
  } else {
    return Math.ceil(subtotal + vat - (subtotal * discount) / 100);
  }
};
// Calculate VAT ::
export const calculateVat = (subtotal, vatPercentage) => {
  return subtotal * (vatPercentage / 100);
};
