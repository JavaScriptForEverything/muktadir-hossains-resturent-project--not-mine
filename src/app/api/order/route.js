import connectToDB from "@/config/connectDb";
import Configuration from "@/models/configurationModel";
import Order from "@/models/foodOrderModel";
import { calculateSubtotal } from "@/utilities/helperFunctions";
import verifyJWT from "@/utilities/verifyJWT";
import { NextResponse } from "next/server";

// Connect to DB::
connectToDB();

// Create  An Order ::
export const POST = async (req, res) => {
  try {
    const reqData = await req.json();

    // Verify Token From cookies::
    const loginToken =
      req.cookies.get(process.env.LOGIN_COOKIE_NAME)?.value || "";

    const verifiedToken = await verifyJWT(
      loginToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(verifiedToken);

    // If user is not authenticated return error::
    if (!verifiedToken || !verifiedToken.id || !verifiedToken.role) {
      return NextResponse.json(
        {
          message: "User is not authenticated!!!",
        },
        {
          status: 401,
        }
      );
    }

    const subTotal = calculateSubtotal(reqData.orderItems);

    // GET Configurations Info & Extract VAT percentage::
    const { vatPercentage } = await Configuration.findOne();
    const { discount_value, discount_type } = await Configuration.findOne();

    // calculate Discount::
    const discount =
      discount_type === "fixed"
        ? discount_value
        : discount_type === "percentage"
        ? subTotal * (discount_value / 100)
        : 0;

    // Calculating VAT::
    const vat = vatPercentage ? (subTotal * vatPercentage) / 100 : 0;

    const payableAmount = Math.ceil(subTotal + vat - discount);

    const response = await Order.create({
      ...reqData,
      SubTotalPrice: subTotal,
      payableAmount,
      vat,
      discount,
    });

    return NextResponse.json({
      message: "Order Placed Successfully!",
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
