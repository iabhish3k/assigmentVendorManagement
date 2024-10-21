import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token'); // Assuming you're storing the token in cookies

  if (!token && pathname !== '/login') {
    // Redirect to login if the user is not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && pathname === '/login') {
    // Redirect to dashboard if already logged in
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
