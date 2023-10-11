import connectToDB from "@/config/connectDb";
import getFullFoodMenu from "@/utilities/getFullFoodMenu";
import { NextResponse } from "next/server";


connectToDB();

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    // Get All food items from the database with Aggregation::
    const menuData = await getFullFoodMenu();
    return NextResponse.json({
      success: true,
      menuData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
    });
  }
};
