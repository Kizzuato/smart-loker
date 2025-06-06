import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/middleware/requireRole';
import { logs } from '@/lib/data';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, status, timestamp } = body;

  if (!id || !status || !timestamp) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  logs.push({ id, status, timestamp });
  return NextResponse.json({ message: 'Log saved' }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(logs);
}
