import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    // Handle pos.aidercorp.com subdomain
    if (hostname.includes('pos.aidercorp.com')) {
        // If we are at the root of the subdomain, redirect to login
        if (url.pathname === '/') {
            url.pathname = '/auth/login';
            return NextResponse.rewrite(url);
        }

        // Otherwise, allow other auth routes or dashboard routes if needed
        // The user specifically said "let this be the signup/login page"
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
