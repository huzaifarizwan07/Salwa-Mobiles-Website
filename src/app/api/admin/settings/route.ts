import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "salwamobiles-super-secret-key-2026"
);

async function verifyAdmin(request: Request) {
    const token = request.headers.get("cookie")?.split("admin_token=")[1]?.split(";")[0];
    if (!token) return false;
    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET(request: Request) {
    try {
        if (!(await verifyAdmin(request))) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const settingsDoc = await getDoc(doc(db, "settings", "global"));
        if (!settingsDoc.exists()) {
            return NextResponse.json({ success: true, data: { discountPercentage: 0 } });
        }

        return NextResponse.json({ success: true, data: settingsDoc.data() });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!(await verifyAdmin(request))) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const discountPercentage = Math.max(0, Math.min(100, Number(body.discountPercentage) || 0));

        await setDoc(doc(db, "settings", "global"), { discountPercentage }, { merge: true });

        return NextResponse.json({ success: true, discountPercentage });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
