import { NextResponse } from "next/server";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
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
        
        const ordersSnap = await getDocs(collection(db, "orders"));

        let orders = ordersSnap.docs.map(doc => {
            const data = doc.data();
            
            // Format date nicely
            let dateStr = "Unknown Date";
            let sortableTime = 0;
            if (data.createdAt) {
                const dateObj = new Date(data.createdAt);
                if (!isNaN(dateObj.getTime())) {
                    dateStr = dateObj.toLocaleString();
                    sortableTime = dateObj.getTime();
                }
            }
            
            return {
                _id: doc.id,
                trackingId: data.trackingId || "N/A",
                customerName: data.customerName || "Unknown",
                customerPhone: data.customerPhone || "N/A",
                customerEmail: data.customerEmail || "N/A",
                customerAddress: data.customerAddress || "N/A",
                items: data.items || [],
                createdAt: dateStr,
                sortableTime: sortableTime,
                totalAmount: data.totalAmount || 0,
                status: data.status || "Processing"
            };
        });
        
        // Sort newest first
        orders.sort((a, b) => b.sortableTime - a.sortableTime);

        return NextResponse.json({ success: true, data: orders });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!(await verifyAdmin(request))) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, status } = body;
        
        if (!id || !status) {
             return NextResponse.json({ success: false, error: "id and status are required" }, { status: 400 });
        }

        const orderRef = doc(db, "orders", id);
        await updateDoc(orderRef, { status });

        return NextResponse.json({ success: true });
    } catch (error: any) {
         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
