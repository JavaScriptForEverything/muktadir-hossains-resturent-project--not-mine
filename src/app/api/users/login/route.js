import connectToDataBase from "@/config/connectDb";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

connectToDataBase();

export const POST = async (req, res) => {
  try {
    const { userName, password } = await req.json();
    // check if the user is available::
    const user = await User.findOne({
      $or: [{ email: userName }, { phoneNumber: userName }],
    });
    // If no user is available on the database::
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    }
    // Check if the Password is correct::
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid && user) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.firstName +' '+ user.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        // {
        //   expiresIn: process.env.JWT_EXPIRY,
        // }
      );
      //   send Response to client::
      const response =  NextResponse.json(
        {
          success: true,
          token:token,
        },
        {
          status: 200,
        }
      );
      response.cookies.set(process.env.LOGIN_COOKIE_NAME, token, {
        maxAge: process.env.LOGIN_COOKIE_EXPIRY, // in secounds
        httpOnly: true,
        signed: true,
      });
      return response;
    }
  } catch (error) {
    console.log("an error occurred")
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: error.status,
      }
    );
  }
};
