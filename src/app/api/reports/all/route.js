import Order from "@/models/foodOrderModel";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const allOrders = await Order.find();
    const paidOrders = await Order.find({ orderStatus: "paid" });
    const pendingOrders = await Order.find({ orderStatus: "pending" });
    const preparingOrders = await Order.find({ orderStatus: "preparing" });
    const canceledOrders = await Order.find({ orderStatus: "canceled" });
    const servedOrders = await Order.find({ orderStatus: "served" });
    return NextResponse.json(
      {
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
