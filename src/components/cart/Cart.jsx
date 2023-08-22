"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { calculateSubtotal } from "@/utilities/helperFunctions";


const Cart = ({
  cartData,
  addToCartHandler,
  decrementCartQuantity,
  removeCartItem,
}) => {
  return (
    <section className="bg-white w-3/12 relative shadow-2xl shadow-slate-500 z-[100] md:block hidden p-5">
      <div className="sticky top-0">
        <h3 className="text-center text-2xl font-semibold text-red-500 mb-2 pt-2">
          Your order
        </h3>
        <div className="max-h-60 overflow-y-auto px-2">
          {cartData.length > 0 ? (
            cartData.map((cartItem, Idx) => {
              return (
                <div
                  key={cartItem._id}
                  className={`flex justify-between items-center pb-3 ${
                    Idx !== cartData.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <div className="text-xs font-mono font-medium">
                    {cartItem.title}
                  </div>
                  {/* ::Items Qty Area:: */}
                  <div>
                    <h1 className="text-semibold font-semibold mb-4 text-center">
                      TK.{" "}
                      <span className="font-mono">
                        {cartItem.price * cartItem.quantity}
                      </span>
                    </h1>
                    <div className="flex items-center justify-around">
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold  rounded pb-1">
                        {cartItem.quantity === 1 ? (
                          <DeleteForeverIcon
                            sx={{ fontSize: 18 }}
                            onClick={() => removeCartItem(cartItem._id)}
                          />
                        ) : (
                          <RemoveIcon
                            sx={{ fontSize: 15 }}
                            onClick={() => decrementCartQuantity(cartItem._id)}
                          />
                        )}
                      </button>
                      <span className="mx-4 text-sm bg-slate-200 p-1 rounded font-semibold">
                        {cartItem.quantity}
                      </span>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold  rounded pb-1">
                        <AddIcon
                          sx={{ fontSize: 15 }}
                          onClick={() => addToCartHandler(cartItem)}
                        />
                      </button>
                    </div>
                  </div>

                  {/* :: Qty Area Ends :: */}
                </div>
              );
            })
          ) : (
            <h3 className="text-center font-mono text-slate-300 my-16">
              Start adding items to your cart
            </h3>
          )}
        </div>
        {/* Calculation Section:: */}
        <hr className="my-2" />
        <div className="flex justify-between">
          <p className="text-sm font-medium">SubTotal:</p>
          <p>{calculateSubtotal(cartData)} Tk.</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">Vat(10%):</p>
          <p>{(calculateSubtotal(cartData) * (10 / 100)).toFixed(2)} Tk.</p>
        </div>
        <div className="flex justify-between pt-3">
          <p className="text-sm font-semibold">Total Amount:</p>
          <p className="font-semibold">
            {calculateSubtotal(cartData) +
              calculateSubtotal(cartData) * (10 / 100)}{" "}
            Tk.
          </p>
        </div>
        <button 
        onClick={() => console.log(cartData)}
        className="bg-red-600 hover:bg-red-700 rounded-md py-2 px-5 text-white font-mono block mx-auto mt-4 ">

          Confirm Order
        </button>
      </div>
    </section>
  );
};

export default Cart;
