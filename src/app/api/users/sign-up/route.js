import connectToDB from "@/config/connectDb";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

connectToDB();

// Create a New User Controller::
export const POST = async (req, res) => {
  try {
    const { firstName, lastName, email, password ,phoneNumber} = await req.json();
    console.log(firstName, lastName,email,password);
    //Hash Password::
    const hashedPassword = await bcrypt.hash(password, 11); // salt round 11
    const res = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber
    });
    return NextResponse.json(
      {
        success: true,
        user: res,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    if(err.code === 11000){
        return NextResponse.json({
            message:`${Object.keys(err.keyPattern)} Must Be Unique.`
        },{
          status:400
        })
    }
    return NextResponse.json(
      {
        err: err.message,
        code: err.status
      },
      {
        status: 500,
      }
    );
  }
};
