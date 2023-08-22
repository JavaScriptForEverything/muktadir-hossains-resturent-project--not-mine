import connectToDB from "@/config/connectDb";
import Configuration from "@/models/configurationModel";
import { NextResponse } from "next/server";

// Connect to DB::
connectToDB();

// GET All Configurations::
export const GET = async () => {
  try {
    const configurations = await Configuration.findOne();
    return NextResponse.json({
      configurations,
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

// Create  A Configuration ::
export const POST = async (req, res) => {
  try {
    // GET REQUEST Body::
    const reqBody = await req.json();

    console.log(reqBody);

    // extract VAT percentage from REQUEST body::
    const vatPercentage = reqBody.vatPercentage;

    // :: check If any Configuration data Available in DB::
    const configuration = await Configuration.find();
    if (configuration.length > 0) {
      const id = configuration[0]._id;
      const response = await Configuration.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
      return NextResponse.json({
        message: "Configuration Updated Successfully",
        configuration: response,
      });
    }

     // :: Check If any data Available in DB::
    const response = await Configuration.create(reqBody);

    return NextResponse.json({
      message: "Configuration created Successfully",
      vatPercentage: response,
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
