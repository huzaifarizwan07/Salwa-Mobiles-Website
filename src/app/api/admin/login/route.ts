import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "salwamobiles-super-secret-key-2026");

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (username === "salwamobiles.pk" && password === "salwamobilestalhausman.pk077") {

            const token = await new SignJWT({ auth: true })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("24h")
                .sign(SECRET);

            const response = NextResponse.json({ success: true });
            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}

export async function verifyAuth(token: string) {
    try {
        const verified = await jwtVerify(token, SECRET);
        return verified.payload;
    } catch (err) {
        return null;
    }
}
