import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/app/models/user";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  try {
    const users = await User.find({ device_id: id }); // atau field yang kamu butuh
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("[bydevice] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pengguna" },
      { status: 500 }
    );
  }
}
