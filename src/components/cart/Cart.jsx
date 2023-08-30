"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  addToCartHandler,
  calculatePayableAmount,
  calculateSubtotal,
  calculateVat,
  decrementCartQuantity,
  removeCartItem,
} from "@/utilities/helperFunctions";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

const Cart = ({cartData, setCartData}) => {
  const [vatPercentage, setVatPercentage] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [discountType, setDiscountType] = useState(null);

  useEffect(() => {

    // setCartData(JSON.parse(localStorage.getItem("cartItems")))


    // GET VAT & Discount Info from server
    fetch("/api/configurations")
      .then((response) => response.json())
      .then((json) => {
        setVatPercentage(json?.configurations?.vatPercentage);
        setDiscount(json?.configurations?.discount?.value);
        setDiscountType(json?.configurations?.discount?.type);
      })
      .catch((err) => console.log(err));
  }, []);

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
                            onClick={() =>
                              removeCartItem(
                                cartItem._id,
                                cartData,
                                setCartData,"cartItems"
                              )
                            }
                          />
                        ) : (
                          <RemoveIcon
                            sx={{ fontSize: 15 }}
                            onClick={() =>
                              decrementCartQuantity(
                                cartItem._id,
                                cartData,
                                setCartData
                              )
                            }
                          />
                        )}
                      </button>
                      <span className="mx-4 text-sm bg-slate-200 p-1 rounded font-semibold">
                        {cartItem.quantity}
                      </span>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold  rounded pb-1">
                        <AddIcon
                          sx={{ fontSize: 15 }}
                          onClick={() =>
                            addToCartHandler(cartItem, cartData, setCartData,"cartItems")
                          }
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
          <p className="text-sm font-medium">SubTotal : </p>
          <p>{calculateSubtotal(cartData)} Tk.</p>
        </div>
        {/* Vat Area  */}
        {vatPercentage !== 0 && vatPercentage && (
          <div className="flex justify-between">
            <p className="text-sm font-medium">{`Vat (${vatPercentage}%) :`}</p>
            <p>
              {(calculateSubtotal(cartData) * (vatPercentage / 100)).toFixed(2)}{" "}
              Tk.
            </p>
          </div>
        )}
        {/* Discount Area */}

        {discount !== 0 && discount && (
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">
              Discount {discountType === "fixed" ? "(Flat)" : "%"} :
            </p>
            <p className="bg-green-200 px-1 py-1 rounded">
              -{discount}
              {discountType === "fixed" ? " Tk" : "%"}
            </p>
          </div>
        )}

        <hr className="mt-2" />
        {/* Total Payable Amount */}
        <div className="flex justify-between pt-3">
          <p className="text-sm font-semibold">Total Amount:</p>
          <p className="font-semibold">
            {calculatePayableAmount(
              calculateSubtotal(cartData),
              calculateVat(calculateSubtotal(cartData), vatPercentage),
              discount,
              discountType
            )}{" "}
            Tk.
          </p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 rounded-md py-2 px-5 text-white font-mono block mx-auto mt-4 ">
          <Link href="/cart">Review Order</Link>
        </button>
      </div>
    </section>
  );
};

export default Cart;
