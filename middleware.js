import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
//console.log('Middleware is running');
export const config = {
  matcher: ['/login'],
};
// Middleware to redirect authenticated users from the login page
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  //console.log('token',token);

  // Check if the user is authenticated and trying to access the login page
  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
