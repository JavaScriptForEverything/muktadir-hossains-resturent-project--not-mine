import connectToDB from "@/config/connectDb";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { existsSync } from "fs";
import MenuItems from "@/models/menuItemsModel";

connectToDB();

export const POST = async (req, res) => {
  try {
    const formData = await req.formData();
    console.log(formData);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const itemCode = formData.get("itemCode");

    const images = formData.getAll("image");

    let ImageUrlArray = [];

    if (images.length > 0) {
      for (let Idx = 0; Idx < images.length; Idx++) {
        const img = images[Idx];
        //  image processing logic
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = img.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return NextResponse.json(
            {
              error:
                "Invalid file format. Only png, jpg, and jpeg files are allowed.",
            },
            { status: 400 }
          );
        }
        const timestamp = Date.now();
        const fileName = `${title}_${timestamp}_${Idx}.${fileExtension}`;
        const publicPath = `public/uploads/food-items/${fileName}`;
        const fileData = await img.arrayBuffer();
        await fs.writeFile(publicPath, Buffer.from(fileData));

        const imageUrl = `${process.env.BASE_URL}/uploads/food-items/${fileName}`;
        ImageUrlArray.push(imageUrl);
      }
    }

    const foodItem = await MenuItems.create({
      title,
      description,
      price: Number(price),
      category,
      images: ImageUrlArray,
      itemCode,
    });

    return NextResponse.json({
      foodItem,
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

export const GET = async (req, res) => {
  try {
    const allMenuItems = await MenuItems.find().populate({
      path: "category",
      select: "-createdAt -updatedAt -_id",
    });
    return NextResponse.json({
      status: true,
      data: allMenuItems,
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
