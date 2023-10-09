import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

// DB Connection:
connectToDB()

export const GET = async (req, { params: { id } }) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: `category not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
