// app/api/enroll-mode/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'enroll-mode.json')

export async function GET() {
  try {
    const file = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(file))
  } catch (error) {
    return NextResponse.json({ enroll_mode: false }) // fallback
  }
}

export async function POST(req: Request) {
  try {
    const { enroll_mode } = await req.json()
    await fs.writeFile(filePath, JSON.stringify({ enroll_mode }))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
