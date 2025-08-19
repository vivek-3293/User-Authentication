import { NextResponse } from "next/server";

const protectedRoutes = [
    "/dashboard",
    "/user",
];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtected = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!isProtected) {
        return NextResponse.next();
    }

    // Check token from cookies
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        loginUrl.search = "";
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/user", "/user/:path*"],
};



