import dbConnect from "@/lib/mongodb";
import { AccessLogModel } from "@/app/models/AccessLog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id: _id } = await params;

  console.log("id nya ", _id);
  // Validasi ID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return NextResponse.json(
      { success: false, error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const access = await AccessLogModel.find({device_id: _id}).sort({access_time: -1})
      .populate("user_id", "name email")
      .populate("device_id", "location status device_id");

    if (!access) {
      return NextResponse.json(
        { success: false, error: "Access log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: access });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
