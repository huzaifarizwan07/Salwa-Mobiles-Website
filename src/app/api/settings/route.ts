import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const settingsDoc = await getDoc(doc(db, "settings", "global"));
        if (!settingsDoc.exists()) {
            return NextResponse.json({ success: true, data: { discountPercentage: 0 } });
        }

        return NextResponse.json({ success: true, data: settingsDoc.data() });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
