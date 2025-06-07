import { NextRequest, NextResponse } from "next/server";

// Giriş yapmadan erişilebilir route'lar
const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/",
    "/about",
    "/contact"
];

// Sadece giriş yapmış kullanıcıların erişebileceği route'lar
const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/users"
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const auth = request.cookies.get('Authentication')?.value;

    // Protected route kontrolü
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    );

    // Korumalı route'a giriş yapmadan erişmeye çalışıyor
    if (isProtectedRoute && !auth) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Giriş yapmış kullanıcı auth sayfalarına gitmeye çalışıyor
    if (auth && (pathname === "/auth/login" || pathname === "/auth/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
    ],
};