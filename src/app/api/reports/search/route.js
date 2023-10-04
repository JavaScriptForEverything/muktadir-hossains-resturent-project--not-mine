import Order from "@/models/foodOrderModel";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

const { default: connectToDB } = require("@/config/connectDb");

connectToDB();

export const GET = async (req, res) => {
  // Get Query Parameters:: From Date , To Date
  const searchParams = req.nextUrl.searchParams;
  const fromDate = searchParams.get("fromDate") || null;
  const toDate = searchParams.get("toDate") || null;
  // Parse To Date Here::
  const parsedToDate = new Date(toDate);
  parsedToDate.setDate(parsedToDate.getDate() + 1);

  //   Page Number & Page Limit::
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("size") || 100;

  try {
    const totalCount = await Order.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    let allOrders;
    allOrders = await Order.find({
      date: {
        $gte: fromDate,
        $lte: parsedToDate,
      },
    })


    return NextResponse.json({
      page,
      size: limit,
      totalOrders: totalCount,
      allOrders,
      totalCount,
      totalPages,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
    });
  }
};
