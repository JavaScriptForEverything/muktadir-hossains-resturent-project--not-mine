import connectToDB from "@/config/connectDb";
import Order from "@/models/foodOrderModel";
import { NextResponse } from "next/server";

connectToDB();

export const GET = async (req) => {
  // Get Query Parameters::
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("size") || 100;

  const fromDate = searchParams.get("fromDate") || null;
  const toDate = searchParams.get("toDate") || null;

  // console.log(toDate,"test", fromDate)

  try {
    const totalCount = await Order.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    let allOrders;
    allOrders = await Order.find()
      .skip((page - 1) * limit)
      .limit(limit);


    // if (toDate && fromDate) {
    // allOrders = await Order.find({
    //   date: {
    //     $gte: fromDate,
    //     $lte: toDate,
    //   },
    // });
    // }

    const paidOrdersCount = await Order.countDocuments({ orderStatus: "paid" });

    const pendingOrdersCount = await Order.countDocuments({ orderStatus: "pending" });
    const canceledOrdersCount= await Order.countDocuments({ orderStatus: "canceled" });

    const preparingOrders = await Order.find({ orderStatus: "preparing" });
    const servedOrders = await Order.find({ orderStatus: "served" });


    return NextResponse.json(
      {
        page,
        size: limit,
        totalOrders: totalCount,
        paidOrdersCount,
        pendingOrdersCount,
        canceledOrdersCount,
        allOrders,
        totalCount,
        totalPages,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: false,
      message: e.message,
    });
  }
};
