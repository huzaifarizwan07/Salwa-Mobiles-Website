"use client";

import { useDiscount } from "@/context/DiscountContext";

export default function DiscountBanner() {
    const { discountPercentage, loading } = useDiscount();

    if (loading || discountPercentage <= 0) return null;

    return (
        <div className="bg-red-600 text-white w-full py-2 px-4 shadow-xl z-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
                <span className="font-heading uppercase tracking-widest text-[10px] md:text-xs font-bold text-center animate-pulse">
                    🚨 FLASHSALE ALIVE: <span className="text-salwa-yellow">{discountPercentage}% OFF</span> ENTIRE VAULT COMMAND CODE ACTIVATED 🚨
                </span>
            </div>
        </div>
    );
}
