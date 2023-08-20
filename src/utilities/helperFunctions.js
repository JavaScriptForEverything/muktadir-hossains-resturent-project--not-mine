// Calculate Sub total Function for CART::
export const calculateSubtotal = (cartData) => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
