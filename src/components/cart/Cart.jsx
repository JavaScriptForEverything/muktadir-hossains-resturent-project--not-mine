"use client"

const calculateSubtotal = (cartData) => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart = ({cartData}) => {
  return (
    <section className="bg-white w-3/12 relative shadow-2xl shadow-slate-500 z-[100] md:block hidden">
      <div className="sticky top-0">
        <h3 className="text-center">Your order</h3>
            {
                cartData.map((cartItem)=>{
                    return(
                        <div key={cartItem._id}>
                            <p>{cartItem.title} :- {cartItem.price} * {cartItem.quantity} = {cartItem.price*cartItem.quantity}</p>
                           
                        </div>
                    )
                })
            }
             <p>SubTotal: {calculateSubtotal(cartData)}</p>
             <p>Vat(10%): {calculateSubtotal(cartData) * (10/100)}</p>
      </div>
    </section>
  );
};

export default Cart;
