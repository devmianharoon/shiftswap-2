import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isTokenExpired, decodeJWT } from '@/data/lib/token';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'   ];
const publicRoutes = ['/signin', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the token from cookies
  const cookieStore = await cookies();
  const tokenData = cookieStore.get('current_user_tt')?.value;
  let isValidToken = false;

  // 4. Validate the token
  if (tokenData) {
    try {
      const parsedData = JSON.parse(tokenData);
      const token = parsedData.token;
      const decoded = decodeJWT(token);
      
      // Check if token is valid and not expired
      if (decoded && decoded.sub && !isTokenExpired(token)) {
        isValidToken = true;
      }
    } catch (error) {
      console.error('Token validation failed:', error);
    }
  }

  // 5. Redirect to /signin if the user is not authenticated for protected routes
  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  // 6. Redirect to /dashboard/users/profile if the user is authenticated for public routes
  if (isPublicRoute && isValidToken && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/users/profile', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};