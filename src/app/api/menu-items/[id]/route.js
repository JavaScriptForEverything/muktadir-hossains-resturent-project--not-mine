import connectToDB from "@/config/connectDb";
import MenuItems from "@/models/menuItemsModel";
import { NextResponse } from "next/server";

connectToDB()
// Delete Menu Items Controller::
export const DELETE = async (request, { params: { id } }) => {
  console.log(id);
  try {
    const deletedMenu = await MenuItems.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Menu Item deleted successfully!",
      id,
      deletedMenu,
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