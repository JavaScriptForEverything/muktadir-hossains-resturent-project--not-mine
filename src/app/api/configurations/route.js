import connectToDB from "@/config/connectDb";
import Configuration from "@/models/configurationModel";
import { NextResponse } from "next/server";


// Connect to DB::
connectToDB();

// Create  A Post ::
export const POST = async (req, res) => {
  try {
    // GET REQUEST Body::
    const reqBody = await req.json();

    // extract VAT percentage from REQUEST body::
    const vatPercentage = reqBody.vatPercentage; 

    const response = await Configuration.create({vat: vatPercentage});

    return NextResponse.json({
      message: "Configuration created Successfully",
      vatPercentage:response,
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
