import connectToDB from "@/config/connectDb";
import Table from "@/models/tableModel";
import { NextResponse } from "next/server";

connectToDB();

export const DELETE = async (req, { params: { id } }) => {
  try {
    const table = await Table.findById(id);

    if (!table && !table._id) {
      return NextResponse.json(
        {
          message: `Table not found!`,
        },
        {
          status: 404,
        }
      );
    }
    // Delete Table from DB::
    const response = await Table.findByIdAndDelete(id);
    return NextResponse.json({
      status: true,
      message: "Table deleted successfully!",
      response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errorMessage: error.message,
        error: error.status,
      },
      {
        status: 500,
      }
    );
  }
};

// Update Table status::
export const POST = async (req, {params: {id}}) => {
  try {
    const table = await Table.findById(id);
    if (!table && !table._id) {
      return NextResponse.json(
        {
          message: `Table not found!`,
        },
        {
          status: 404,
        }
      );
    }

    // Delete Table from DB::
    const response = await Table.findByIdAndUpdate(id,{
        isFree : table.isFree === 'free' ? 'booked':'free'
    },{new : true});


    return NextResponse.json({
      status: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        errorMessage: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
