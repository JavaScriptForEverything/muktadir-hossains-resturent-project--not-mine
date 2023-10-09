import { NextResponse } from "next/server";

export const POST = async (req, { params: { id } }) => {
  try {
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
