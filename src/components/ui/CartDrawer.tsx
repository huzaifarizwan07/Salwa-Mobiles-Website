"use client";

import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen, isCheckoutMode, setIsCheckoutMode } = useCart();

    const [loading, setLoading] = useState(false);
    const [successId, setSuccessId] = useState("");
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });

    // Prevent scrolling when cart is open
    useEffect(() => {
        if (!isCartOpen) {
            setTimeout(() => {
                setIsCheckoutMode(false);
                setSuccessId("");
                setFormData({ name: "", phone: "", email: "", address: "" });
            }, 300);
        }
        
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isCartOpen]);

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/orders/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerPhone: formData.phone,
                    customerEmail: formData.email,
                    customerAddress: formData.address,
                    items: cart,
                    totalAmount: cartTotal
                })
            });
            const json = await res.json();
            if (json.success) {
                setSuccessId(json.trackingId);
                clearCart();
            } else {
                alert(json.error || "Failed to place order.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="relative w-full max-w-md bg-[#0a0a0a] border-l brutalist-border !border-gray-800 h-full flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="text-xl font-heading text-white uppercase tracking-widest flex items-center gap-2">
                        {successId ? (
                             <><CheckCircle size={20} className="text-green-500" /> Success</>
                        ) : isCheckoutMode ? (
                             <><ArrowLeft size={20} className="text-salwa-yellow cursor-pointer hover:text-white transition-colors" onClick={() => setIsCheckoutMode(false)} /> Checkout</>
                        ) : (
                             <><ShoppingBag size={20} className="text-salwa-yellow" /> Your Cart</>
                        )}
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {successId ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                            <CheckCircle size={64} className="text-green-500 mb-4" />
                            <h3 className="text-2xl font-heading uppercase text-white tracking-widest">Order Placed!</h3>
                            <p className="text-gray-400 text-sm">Your order has been successfully placed. Your tracking ID is:</p>
                            <div className="bg-salwa-yellow/10 border border-salwa-yellow text-salwa-yellow px-6 py-3 font-bold tracking-widest text-xl rounded">
                                {successId}
                            </div>
                            <Link href={`/track?id=${successId}`} onClick={() => setIsCartOpen(false)} className="text-sm uppercase tracking-wider border-b border-gray-500 hover:text-white hover:border-white pb-1 transition-colors mt-8">
                                Track Order
                            </Link>
                        </div>
                    ) : isCheckoutMode ? (
                        <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4 animate-slide-in-right h-full flex flex-col pt-2">
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Full Name</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors" placeholder="e.g. Ali Khan" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Phone Number</label>
                                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors" placeholder="e.g. 0300 1234567" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Email Address (Optional)</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors" placeholder="e.g. ali@example.com" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Delivery Address</label>
                                <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors" placeholder="House No, Street, Area, City"></textarea>
                            </div>
                            
                            {/* Summary in checkout mode */}
                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 text-sm">Items</span>
                                    <span className="text-white text-sm">{cart.length}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold">
                                    <span className="text-white uppercase tracking-wider">Total</span>
                                    <span className="text-salwa-yellow text-xl">Rs {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </form>
                    ) : cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 animate-fade-in">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                            <button onClick={() => setIsCartOpen(false)} className="text-salwa-yellow border-b border-salwa-yellow pb-1 uppercase tracking-wider text-xs font-bold hover:text-white hover:border-white transition-colors mt-4">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-4 glass p-4 border border-gray-800">
                                <div className="w-20 h-20 bg-black relative flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-white font-medium text-sm leading-tight text-white/90">{item.name}</h3>
                                        <button onClick={() => removeFromCart(item._id)} className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-700 bg-black">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-white text-xs w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                                                disabled={item.quantity >= item.stock}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-salwa-yellow font-medium text-sm">Rs {item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && !successId && (
                    <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
                        {!isCheckoutMode ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-400 uppercase tracking-widest text-sm">Total</span>
                                    <span className="text-2xl font-bold text-white">Rs {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="space-y-3">
                                    <button onClick={() => setIsCheckoutMode(true)} className="w-full bg-salwa-yellow text-black font-heading uppercase tracking-widest py-4 hover:bg-white transition-colors">
                                        Checkout securely
                                    </button>
                                    <button onClick={clearCart} className="w-full text-gray-500 uppercase tracking-widest text-xs font-bold py-2 hover:text-red-500 transition-colors">
                                        Clear Cart
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button 
                                form="checkoutForm" 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-salwa-yellow flex justify-center items-center gap-3 text-black font-heading uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {loading && <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>}
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
