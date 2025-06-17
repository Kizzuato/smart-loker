import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/app/models/user";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const updateData = await req.json();

    if (
      updateData.fingerprint_id !== null &&
      updateData.fingerprint_id !== undefined
    ) {
      const existingUser = await User.findOne({
        _id: { $ne: params.id }, // pastikan bukan diri sendiri
        fingerprint_id: updateData.fingerprint_id,
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Fingerprint ID sudah digunakan oleh user lain.",
          },
          { status: 409 }
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 400 }
    );
  }
}
