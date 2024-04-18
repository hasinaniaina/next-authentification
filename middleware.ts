export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (isAuthenticated) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.url));
}

export const config = { matcher: ["/home"] }