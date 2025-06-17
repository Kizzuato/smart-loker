// src/app/api/items/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { DeviceModel } from '@/app/models/Device';
import mongoose from 'mongoose';

export async function GET() {
  await dbConnect();
  try {
    const items = await DeviceModel.find({}).sort({ device_id: 1});
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch items' }, { status: 400 });
  }
}

// export async function POST(request: NextRequest) {
//   await dbConnect();
//   try {
//     const body = await request.json();
//     const device = await DeviceModel.create(body);
//     return NextResponse.json({ success: true, data: device }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Failed to create device' }, { status: 400 });
//   }
// }
