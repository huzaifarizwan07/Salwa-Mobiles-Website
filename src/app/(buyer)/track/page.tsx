"use client";

import { useState } from "react";
import Reveal from "@/components/animations/Reveal";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function TrackOrderPage() {
    const [trackingId, setTrackingId] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?id=${encodeURIComponent(trackingId)}`);
            const json = await res.json();

            if (json.success) {
                setOrder(json.data);
            } else {
                setError(json.error || "Order not found. Please check your Tracking ID.");
            }
        } catch (e) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case "Pending":
            case "Processing": return <Clock className="text-salwa-yellow" size={32} />;
            case "Shipped": return <Truck className="text-salwa-yellow" size={32} />;
            case "Delivered": return <CheckCircle className="text-green-500" size={32} />;
            default: return <Package className="text-gray-500" size={32} />;
        }
    };

    return (
        <div className="flex-1 bg-black flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
            <Reveal direction="up" className="w-full max-w-2xl text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-widest text-white mb-4">
                    Track <span className="text-salwa-yellow">Order</span>
                </h1>
                <p className="text-gray-400">Enter your official tracking ID to see the real-time status of your delivery.</p>
            </Reveal>

            <Reveal delay={0.1} direction="up" className="w-full max-w-xl">
                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="e.g. 7X9K2P1L"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                            className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-12 pr-4 py-4 text-lg focus:outline-none focus:border-salwa-yellow transition-colors font-mono uppercase tracking-widest placeholder:text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !trackingId.trim()}
                        className="bg-salwa-yellow text-black font-bold uppercase tracking-widest px-8 py-4 brutalist-border hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        {loading ? "Locating..." : "Track Now"}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-center p-4">
                        {error}
                    </div>
                )}

                {order && (
                    <div className="glass border brutalist-border !border-salwa-yellow overflow-hidden animate-slide-in-right">
                        {/* Header */}
                        <div className="bg-[#0a0a0a] border-b border-gray-800 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Order ID</p>
                                <p className="text-white font-mono font-bold tracking-widest text-xl">{order.trackingId}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-[#111] border border-gray-800 px-4 py-2 rounded-full">
                                <StatusIcon status={order.status} />
                                <span className={`font-bold uppercase tracking-widest text-sm ${order.status === 'Delivered' ? 'text-green-500' : 'text-salwa-yellow'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-white text-sm uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">Destination</h3>
                                <p className="text-gray-300 font-medium">{order.customerName}</p>
                                <p className="text-gray-400 text-sm mt-1">{order.customerAddress}</p>
                                <p className="text-gray-500 text-xs mt-2 font-mono">{order.customerPhone}</p>
                            </div>

                            <div>
                                <h3 className="text-white text-sm uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">Order Items</h3>
                                <div className="space-y-3">
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-xs">{item.quantity}x</span>
                                                <span className="text-gray-300 text-sm">{item.name}</span>
                                            </div>
                                            <span className="text-gray-400 text-sm font-mono">Rs {item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Total Footer */}
                        <div className="bg-[#0a0a0a] border-t border-gray-800 p-6 flex justify-between items-center">
                            <span className="text-gray-400 uppercase tracking-widest text-sm">Total Amount</span>
                            <span className="text-salwa-yellow font-bold text-xl">Rs {order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </Reveal>
        </div>
    );
}
