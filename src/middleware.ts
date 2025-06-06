import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { NextAuthMiddlewareOptions } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth.token;

    // if (token?.role !== 'admin') {
    //   return NextResponse.redirect(new URL('/not-authorized', req.url));
    // }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/auth/signin',
    },
  } satisfies NextAuthMiddlewareOptions
);

export const config = {
  matcher: ['/admin/:path*'],
}
