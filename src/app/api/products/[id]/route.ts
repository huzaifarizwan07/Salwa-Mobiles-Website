import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { _id: docSnap.id, ...docSnap.data() } });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const docRef = doc(db, "products", id);
        // Ensure the doc exists first before updating
        const checkSnap = await getDoc(docRef);
        if (!checkSnap.exists()) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        await updateDoc(docRef, body);
        const docSnap = await getDoc(docRef);

        return NextResponse.json({ success: true, data: { _id: docSnap.id, ...docSnap.data() } });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, "products", id);

        const checkSnap = await getDoc(docRef);
        if (!checkSnap.exists()) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        await deleteDoc(docRef);
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
