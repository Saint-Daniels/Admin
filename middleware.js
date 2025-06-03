import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request) {
  // Get the token from the request cookies
  const token = request.cookies.get('supabase-token')?.value;

  // If the user is not logged in and trying to access a protected route
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in and trying to access the login page
  if (token && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/office', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/office/:path*', '/login']
}; 