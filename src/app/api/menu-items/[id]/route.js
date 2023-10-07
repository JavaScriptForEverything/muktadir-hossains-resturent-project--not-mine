import connectToDB from "@/config/connectDb";
import MenuItems from "@/models/menuItemsModel";
import { NextResponse } from "next/server";

connectToDB();

// GET Food Item By ID::
export const GET = async (req, { params: { id } }) => {
  try {
    const foodItem = await MenuItems.findById(id);
    // Check if the food item Available::
    if (!foodItem) {
      throw new Error("No food item found", 404);
    }
    return NextResponse.json({ status: true, id ,type: "GET"});
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
};

// UPDATE a food item::
export const POST = async (req, { params: { id } }) => {
  try {

    const formData  = await req.formData();
    const title = formData.get('title')
    const itemCode = formData.get('itemCode')
    const category = formData.get('category')
    const description = formData.get('description')
    const price = formData.get('price')
    const image = formData.get('image')

    
    return NextResponse.json(
      {
        status: true,
      },
      {
        status: 202,
      }
    );
  } catch (error) {
    console.error(error);
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
