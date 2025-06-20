import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isTokenExpired, decodeJWT } from '@/data/lib/token';

// 1. Specify protected, public, member-restricted, and business-restricted routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/signin', '/signup', '/'];
const memberRestrictedRoutes = [
  '/dashboard/groups',
  '/dashboard/members',
  '/dashboard/manage-swap-requests',
];
const businessRestrictedRoutes = [
  '/dashboard/my-swap-requests',
];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected, public, or restricted
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);
  const isMemberRestrictedRoute = memberRestrictedRoutes.some((route) => path.startsWith(route));
  const isBusinessRestrictedRoute = businessRestrictedRoutes.some((route) => path.startsWith(route));

  // 3. Get the token from cookies
  const cookieStore = await cookies();
  const tokenData = cookieStore.get('current_user_tt')?.value;
  let isValidToken = false;
  let accountType = '';

  // 4. Validate the token and fetch user data
  if (tokenData) {
    try {
      const parsedData = JSON.parse(tokenData);
      const token = parsedData.token;
      const decoded = decodeJWT(token);

      // Check if token is valid and not expired
      if (decoded && decoded.sub && !isTokenExpired(token)) {
        isValidToken = true;

        // 5. Fetch user data from API using userId from token.sub
        try {
          const userId = decoded.sub; // Extract userId from token
          const apiUrl = `${process.env.NEXT_PUBLIC_BE_URL}/user/${userId}`;
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            accountType = userData.account_type || ''; // Extract account_type from API response
          } else {
            console.error('Failed to fetch user data:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('API request failed:', error);
        }
      }
    } catch (error) {
      console.error('Token validation failed:', error);
    }
  }

  // 6. Redirect to /signin if the user is not authenticated for protected routes
  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  // 7. Redirect to /dashboard/users/profile if the user is authenticated for public routes
  if (isPublicRoute && isValidToken && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/users/profile', req.nextUrl));
  }

  // 8. Restrict access to specific routes for member account type
  if (isValidToken && isMemberRestrictedRoute && accountType === 'member') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // 9. Restrict access to specific routes for business account type
  if (isValidToken && isBusinessRestrictedRoute && accountType === 'business') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};