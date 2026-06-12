import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

// Re-use secret from middleware
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
        const customerMap = new Map();

        ordersSnap.forEach(doc => {
            const data = doc.data();
            const phone = data.customerPhone;

            if (!phone) return;

            if (!customerMap.has(phone)) {
                customerMap.set(phone, {
                    phone,
                    name: data.customerName,
                    email: data.customerEmail,
                    address: data.customerAddress,
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrderDate: data.createdAt || 0
                });
            }

            const cust = customerMap.get(phone);
            cust.totalOrders += 1;
            cust.totalSpent += (data.totalAmount || 0);

            // Assume the newest createdAt is the most recent address
            if (data.createdAt && cust.lastOrderDate < data.createdAt) {
                cust.lastOrderDate = data.createdAt;
                cust.address = data.customerAddress;
            }
        });

        // Sort by top spenders descending
        const customers = Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

        return NextResponse.json({ success: true, data: customers });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
