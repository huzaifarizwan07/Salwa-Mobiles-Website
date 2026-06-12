import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const trackingId = searchParams.get("id");

        if (!trackingId) {
            return NextResponse.json({ success: false, error: "Tracking ID is required" }, { status: 400 });
        }

        const q = query(collection(db, "orders"), where("trackingId", "==", trackingId.toUpperCase()));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
        }

        const orderDoc = querySnapshot.docs[0];
        const order = { _id: orderDoc.id, ...orderDoc.data() };

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
