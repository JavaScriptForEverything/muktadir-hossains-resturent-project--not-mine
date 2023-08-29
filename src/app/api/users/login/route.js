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
          role: user.role,
          name: user.firstName + " " + user.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      //   send Response to client::
      const response = NextResponse.json(
        {
          success: true,
          role: user.role, // USER'S ROLE
          token, // TOKEN
        },
        {
          status: 200,
        }
      );
      response.cookies.set(process.env.LOGIN_COOKIE_NAME, token, {
        maxAge: process.env.LOGIN_COOKIE_EXPIRY, // in seconds
        httpOnly: true,
        signed: true,
      });
      return response;
    }
  } catch (error) {
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
