import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import { User } from "@/app/models/user";

const dataPath = path.join(process.cwd(), "user-data.json");
const enrollPath = path.join(process.cwd(), "enroll-mode.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, nim } = body;

    const data = await fs.readFile(dataPath, "utf-8").catch(() => "[]");
    const users = JSON.parse(data);
    users.push({ id, name, nim, date: new Date().toISOString() });
    await fs.writeFile(dataPath, JSON.stringify(users, null, 2));

    // Aktifkan mode pendaftaran fingerprint
    await fs.writeFile(
      enrollPath,
      JSON.stringify({ enroll_mode: true, current_id: id })
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch items" },
      { status: 400 }
    );
  }
}