// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isExpired } from './lib/helper/jwt';


export async function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // Define paths that don't require authentication
  const publicPaths = ['/login', '/register']; // Adjust as needed

  // If the request is to a public path, allow it
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check if token exists and is not expired
  if (!token || isExpired(token)) {
    // Redirect to login page if token is missing or expired
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname); // Optional: Preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // Token is valid, proceed with the request
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: [
    '/((?!_next|api/auth).*)', // Apply to all routes except _next and auth APIs
  ],
};