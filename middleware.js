import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Allow access to login page
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Protect API routes
  if (isApiRoute && !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Protect all other routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 