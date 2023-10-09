import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

connectToDB();

// Update Category::
export const GET = async (req, { params: { id } }) => {
  try {
    // Get Body From Request:
    const searchParams = req.nextUrl.searchParams;
    const categoryName = searchParams.get("categoryName")

    const category = await Category.findById(id);
    // If no category is found then Throw an error::
    if (!category) {
      throw new Error("No category found!");
    }
    // Update Category Here::
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      {
        new: true,
      }
    );

    return NextResponse.redirect(new URL('/dashboard/category', req.url))
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        status: false,
        statusCode: 404,
        errMessage: err.message,
      },
      {
        status: 500,
      }
    );
  }
};

// Delete Category Controller::
export const DELETE = async (request, { params: { id } }) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Category deleted successfully!",
      id,
      deletedCategory,
    });
  } catch (error) {
    console.log("This an Error:", error);
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
