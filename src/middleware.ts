import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { EUserRole } from '@/features/user/types/EUserRole';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });

  // Protect any route that starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log(token);
    if (!token || token.role !== EUserRole.ADMIN) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
