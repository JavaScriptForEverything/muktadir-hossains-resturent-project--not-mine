import connectToDB from "@/config/connectDb";
import Order from "@/models/foodOrderModel";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

connectToDB();

export const GET = async (req) => {
  // Get Query Parameters::
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("size") || 100;

  try {
    const totalCount = await Order.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const allOrders = await Order.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const paidOrders = await Order.find({ orderStatus: "paid" });
    const pendingOrders = await Order.find({ orderStatus: "pending" });
    const preparingOrders = await Order.find({ orderStatus: "preparing" });
    const canceledOrders = await Order.find({ orderStatus: "canceled" });
    const servedOrders = await Order.find({ orderStatus: "served" });
    return NextResponse.json(
      {
        page,
        size: limit,
        status: true,
        totalOrders: allOrders.length,
        paidOrdersCount: paidOrders.length,
        pendingOrdersCount: pendingOrders.length,
        allOrders,
        paidOrders,
        pendingOrders,
        preparingOrders,
        canceledOrders,
        servedOrders,
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
