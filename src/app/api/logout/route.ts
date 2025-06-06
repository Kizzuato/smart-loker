import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' })

  // Hapus token dari cookie
  response.cookies.set('token', '', {
    path: '/',
    expires: new Date(0), // atau maxAge: 0
  })

  return response
}
