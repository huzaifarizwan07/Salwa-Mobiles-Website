import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "salwamobiles-super-secret-key-2026");

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public routes that don't require authentication
    const isPublicRoute = path === '/admin/login';

    // Check if we are asking for an admin route
    const isAdminRoute = path.startsWith('/admin');

    if (isAdminRoute && !isPublicRoute) {
        const token = request.cookies.get('admin_token')?.value;

        // If no token, redirect to login page
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // Verify token validity
            await jwtVerify(token, SECRET);
        } catch (error) {
            // Token is invalid or expired
            // Can optionally clear the cookie here, but nextjs middleware read-only cookie approach can be tricky without modifying response headers. 
            // Redirecting to login is sufficient as login will overwrite it.
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // If trying to access login page while authenticated, redirect to dashboard
    if (path === '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        if (token) {
            try {
                await jwtVerify(token, SECRET);
                return NextResponse.redirect(new URL('/admin', request.url));
            } catch (error) {
                // Token invalid, allow them to stay on the login page
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
