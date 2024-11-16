import { NextResponse } from 'next/server';

export async function middleware(): Promise<NextResponse> {
  // const token = await getToken({ req: request });

  // Protect any route that starts with /admin
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   console.log(token);
  //   if (!token || token.role !== EUserRole.ADMIN) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
