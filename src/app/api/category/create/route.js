import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

connectToDB()

export const POST = async (req, res) => {
  try {
    const { categoryName } = await req.json();
    // console.log(categoryName);
    const category = await Category.create({categoryName})
    // console.log(category)

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
