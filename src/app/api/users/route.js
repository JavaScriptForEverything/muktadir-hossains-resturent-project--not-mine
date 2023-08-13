import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises"; // Import the fs module
import { existsSync } from "fs";
import path from "path";

export const POST = async (req, res) => {
  try {
    const formData = await req.formData();
    const avatar = formData.get("avatar");
    const name = formData.get("name"); // Get the 'name' value from the FormData

    if (!name || !avatar) {
      return NextResponse.json(
        {
          error: "Name and avatar must be provided.",
        },
        { status: 400 }
      );
    }
    // Ensure that the file has a valid extension (png, jpg, jpeg)
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = avatar.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        {
          error:
            "Invalid file format. Only png, jpg, and jpeg files are allowed.",
        },
        { status: 400 }
      );
    }

    // Save the 'avatar' file to the public folder with the given name and current timestamp
    const timestamp = Date.now();
    const fileName = `${name}_${timestamp}.${fileExtension}`;
    const publicPath = `public/uploads/${fileName}`;
    const fileData = await avatar.arrayBuffer(); // Read file data as ArrayBuffer
    await fs.writeFile(publicPath, Buffer.from(fileData)); // Convert ArrayBuffer to Buffer and write to file

    const imageUrl = `${process.env.BASE_URL}/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      err: err.message,
    });
  }
};

// Delete Controller::
export const DELETE = async (req, res) => {
  const imageUrl = `http://localhost:3000/uploads/rabbi_1690700053237.png`;

  try {
    // Parse the imageUrl to extract the pathname (local path)
    const baseName = path.basename(imageUrl);

    console.log(`Image URL: ${baseName}`);
    const imagePath = path.join(process.cwd(), "public/uploads/" + baseName);

    if (existsSync(imagePath)) {
      await fs.unlink(imagePath);
      return NextResponse.json({
        success: true,
        message: "Image Deleted successfully",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Image dont exist",
    },{
      status: 400,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete image",
      },
      {
        status: 500,
      }
    );
  }
};
