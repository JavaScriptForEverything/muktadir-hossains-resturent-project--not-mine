import connectToDB from "@/config/connectDb";
import Table from "@/models/tableModel";
import { NextResponse } from "next/server";

connectToDB();

export const GET = async (req, res) => {
  try {
    const allTables = await Table.find({}, "-createdAt -updatedAt")

    return NextResponse.json({
        allTables
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.status,
      }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const reqBody = await req.json();
    const table = await Table.create(reqBody);

    return NextResponse.json(
      {
        success: true,
        table,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.status,
      }
    );
  }
};
