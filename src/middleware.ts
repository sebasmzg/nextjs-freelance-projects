import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    
    const privatePaths = [
        '/dashboard',
        '/profile'
    ];
    const authPaths = [
        '/login',
        '/register'
    ]

    const isPrivateRoute = privatePaths.some(
        (path)=>
        pathname.startsWith(path)
    );

    const isAuthRoute = authPaths.some(
        (path)=>
        pathname.startsWith(path)
    );

    if (isPrivateRoute && !token){
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && token){
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        // '/dashboard/:path*',
        // '/profile/:path*',
        // '/login',
        // '/register'
    ]
}