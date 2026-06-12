import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest) {
    try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));

        return NextResponse.json({ success: true, count: products.length, data: products });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Add timestamp for sorting
        body.createdAt = Date.now();

        const docRef = await addDoc(collection(db, "products"), body);
        const product = { _id: docRef.id, ...body };

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
