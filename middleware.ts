import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET
})
export const config = { matcher: "/home" }