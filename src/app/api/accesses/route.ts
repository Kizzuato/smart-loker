import dbConnect from "@/lib/mongodb";
import { AccessLogModel } from "@/app/models/AccessLog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  try {
    const accesses = await AccessLogModel.find({}).populate(
      "user_id",
      "name email"
    ).populate("device_id", "location status device_id");
    return NextResponse.json({ success: true, data: accesses });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const newLog = await AccessLogModel.create({
      device_id: body.device_id,
      user_id: body.user_id,
      status: body.status,
      timestamp: new Date(), // atau body.timestamp jika dikirim dari ESP
    });

    console.log("aman?");
    return NextResponse.json({ success: true, data: newLog });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function 
