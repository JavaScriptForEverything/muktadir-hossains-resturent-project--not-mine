import connectToDB from "@/config/connectDb";
import Category from "@/models/categoryModel";
import MenuItems from "@/models/menuItemsModel";
import axios from "axios";
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


// Call API for Deleting the Menu Items Function::
const deleteFoodItems = async(foodItems)=> {
  try {
    await Promise.all(foodItems.map(async (item) => {
      const apiUrl = `http://localhost:3000/api/menu-items/${item._id}`;
      const response = await axios.delete(apiUrl);
      console.log(`Deleted item with ID ${item.id}. Response:`, response.data);
    }));

    console.log('All items deleted successfully.');
  } catch (error) {
    console.error('Error deleting items:', error);
  }
}


// Delete Category Controller::
export const DELETE = async (request, { params: { id } }) => {
  try {
    // delete category related Items first ::
    const foodItems = await MenuItems.find({category : id});
    /*
        Check if the category has any associated Food Items 
        Then Delete All Food Items Here::
    */
    if(foodItems.length > 0) {
      deleteFoodItems(foodItems)
    }
    // Delete the category 
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
