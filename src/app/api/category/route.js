import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

connectToDB();

// Get ALL the Categories From API::
export const GET = async (req, res) => {
  try {
    const category = await Category.find({}, "-createdAt -updatedAt -__v").exec();
    // console.log(category);
    return NextResponse.json(
      {
        success: true,
        category,
      },
      {
        status: 200,
      }
    );
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


