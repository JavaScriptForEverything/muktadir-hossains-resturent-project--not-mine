import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

// Delete Category Controller::
export const DELETE = async (request, { params: { id } }) => {
  console.log(id);
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
