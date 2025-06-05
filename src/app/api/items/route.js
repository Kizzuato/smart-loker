// src/app/api/items/route.js
import dbConnect from '@/lib/mongodb';
import Item from '../../models/Item';

export async function GET() {
  await dbConnect();
  try {
    const items = await Item.find({});
    return Response.json({ success: true, data: items });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const item = await Item.create(body);
    return Response.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
