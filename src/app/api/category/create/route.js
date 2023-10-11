import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

connectToDB()

// Create a Category::
export const POST = async (req, res) => {
  try {
    const { categoryName } = await req.json();
    const category = await Category.create({categoryName})

    return NextResponse.json({
      success: true,
      data: category,
    },{
        status: 201,
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
