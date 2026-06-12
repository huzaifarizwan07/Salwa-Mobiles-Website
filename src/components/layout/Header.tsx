"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 w-full z-[100] glass border-b brutalist-border !border-x-0 !border-t-0 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Mobile Menu Icon */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-salwa-yellow hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-heading text-white tracking-widest uppercase">
                    Salwa <span className="text-salwa-yellow">Mobiles</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest uppercase">
                    <Link href="/shop" className="hover:text-salwa-yellow transition-colors">The Vault</Link>
                    <Link href="/about" className="hover:text-salwa-yellow transition-colors">About</Link>
                    <Link href="/track" className="hover:text-salwa-yellow transition-colors">Track Order</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    <button className="text-white hover:text-salwa-yellow transition-colors hidden md:block">
                        <Search size={22} />
                    </button>
                    <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-salwa-yellow transition-colors relative">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-salwa-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <nav className="md:hidden absolute top-[72px] left-0 w-full bg-[#0a0a0a] border-b border-gray-800 flex flex-col p-6 space-y-6 text-sm font-medium tracking-widest uppercase shadow-2xl">
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop" className="hover:text-salwa-yellow transition-colors">The Vault</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="hover:text-salwa-yellow transition-colors">About</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/track" className="hover:text-salwa-yellow transition-colors">Track Order</Link>
                </nav>
            )}
        </header>
    );
}
