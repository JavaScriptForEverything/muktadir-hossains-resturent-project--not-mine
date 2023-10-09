import connectToDB from "@/config/connectDb";
import MenuItems from "@/models/menuItemsModel";
import { NextResponse } from "next/server";
// Core Modules::
import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";

connectToDB();

// GET Food Item By ID::
export const GET = async (req, { params: { id } }) => {
  try {
    const foodItem = await MenuItems.findById(id);
    // Check if the food item Available::
    if (!foodItem) {
      throw new Error("No food item found", 404);
    }
    return NextResponse.json({ status: true, data: foodItem });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
};

// UPDATE a food item::
export const POST = async (req, { params: { id } }, Response) => {

  try {
    // Check if item exists::
    const item = await MenuItems.findById(id);
    if (!item) {
      return NextResponse.json(
        {
          status: false,
          message: "No such item found!",
        },
        {
          status: 404,
        }
      );
    }
    const formData = await req.formData();
    const title = formData.get("title");
    const itemCode = formData.get("itemCode");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const image = formData.getAll("image");

    let ImageUrlArray = [];
    // If any Image exist Store It in the server & DB::
    if (image.length > 0) {
      // ::Delete the old Image::
      const filename = path.basename(item.images[0]);
      const imagePath = path.join(
        __dirname,
        "../../../../../../public/uploads/food-items/",
        filename
      );
      // Remove If img available
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted");
      }
      // Handel new Image:
      const img = image[0];
      //  image processing logic::
      const allowedExtensions = ["png", "jpg", "jpeg"];
      const fileExtension = img.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        // if file extension is not allowed:
        return NextResponse.json(
          {
            error:
              "Invalid file format. Only png, jpg, and jpeg files are allowed.",
          },
          { status: 400 }
        );
      }
      const timestamp = Date.now();
      // Create File Name
      const fileName = `${title}_${timestamp}_${0}.${fileExtension}`;
      // Choose where to put the file::
      const publicPath = `public/uploads/food-items/${fileName}`;
      const fileData = await img.arrayBuffer();
      // Write the File::
      await fsPromises.writeFile(publicPath, Buffer.from(fileData));

      const imageUrl = `${process.env.BASE_URL}/uploads/food-items/${fileName}`;
      ImageUrlArray.push(imageUrl);
    }

    // Create New Food Item Object for DB:
    let categoryID = item.category;
    if (category) {
      categoryID = category;
    }
    let newFoodItem = {
      title,
      description,
      price: Number(price),
      category: categoryID,
      itemCode,
    };

    // If Image uploaded then change the old Image URLs:
    if (ImageUrlArray.length > 0) {
      newFoodItem.images = ImageUrlArray;
    }
    // Update in DB::
    const foodItem = await MenuItems.findByIdAndUpdate(id, newFoodItem, {
      new: true,
    });
    // Redirect To the Food Items Page::

    // return NextResponse.redirect(new URL('/about', req.url))
    return NextResponse.json({
      status: true,
      foodItem,
    });
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
  try {
    const foodItem = await MenuItems.findById(id);
    // If no item available send 404:
    if (!foodItem) {
      return NextResponse.json(
        {
          err: "Food Item not found",
          code: 404,
        },
        {
          status: 404,
        }
      );
    }

    // Delete Photo from Server:
    const filename = path.basename(foodItem.images[0]);
    const imagePath = path.join(
      __dirname,
      "../../../../../../public/uploads/food-items/",
      filename
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log("Image deleted");
    }

    // Delete Item From DB::
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
