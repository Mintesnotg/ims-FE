// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isExpired } from '../lib/helper/jwt';
import { cookies } from 'next/headers';


export async function middleware(request: NextRequest) {
 
  const token = (await cookies()).get("accessToken")?.value;


  const publicPaths = ['/login', '/register']; // Adjust as needed

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
    '/((?!_next|api/auth).*)', // Applys to all routes except _next and auth APIs
  ],
};