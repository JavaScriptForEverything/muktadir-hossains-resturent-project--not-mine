import connectToDB from "@/config/connectDb";
import Configuration from "@/models/configurationModel";
import Order from "@/models/foodOrderModel";
import { calculateSubtotal } from "@/utilities/helperFunctions";
import { NextResponse } from "next/server";

// Connect to DB::
connectToDB();

// Create  A Post ::
export const POST = async (req, res) => {
  try {
    const reqData = await req.json();

    const subTotal = calculateSubtotal(reqData.orderItems);

    // GET Configurations Info & Extract VAT percentage::
    const {vat:vatPercentage} = await Configuration.findOne(); 

    // Calculating VAT::
    const vat =  (vatPercentage) ? (subTotal * vatPercentage) / 100 : 0;

    const payableAmount = subTotal + vat;

    const response = await Order.create({
      ...reqData,
      SubTotalPrice: subTotal,
      payableAmount,
      vat
    });

    return NextResponse.json({
      message: "Order Placed Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        err: error.message,
        code: error.status,
      },
      {
        status: 500,
      }
    );
  }
};
