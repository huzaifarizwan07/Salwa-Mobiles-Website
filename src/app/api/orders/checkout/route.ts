import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerPhone, customerEmail, customerAddress, items, totalAmount } = body;

        if (!customerName || !customerPhone || !customerAddress || !items || items.length === 0) {
            return NextResponse.json({ success: false, error: "Missing required fields and items" }, { status: 400 });
        }

        // Generate tracking ID
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const trackingId = `ORD-${randomNum}`;

        const orderData = {
            trackingId,
            customerName,
            customerPhone,
            customerEmail: customerEmail || "",
            customerAddress,
            items,
            totalAmount,
            status: "Processing",
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, "orders"), orderData);

        return NextResponse.json({ success: true, trackingId, docId: docRef.id });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
