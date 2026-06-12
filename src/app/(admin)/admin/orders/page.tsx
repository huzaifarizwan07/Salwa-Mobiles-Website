"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            const json = await res.json();
            if(json.success) {
                setOrders(json.data);
            }
        } catch(e) {
            console.error(e);
        }
    };

    const toggleStatus = async (docId: string, currentStatus: string) => {
        const nextStatus = currentStatus === "Processing" ? "Dispatched" : currentStatus === "Dispatched" ? "Delivered" : "Processing";
        
        // Optimistic update
        setOrders(orders.map(o => o._id === docId ? { ...o, status: nextStatus } : o));
        
        try {
            await fetch("/api/admin/orders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: docId, status: nextStatus })
            });
        } catch(e) {
            console.error(e);
            // Revert on error
            setOrders(orders.map(o => o._id === docId ? { ...o, status: currentStatus } : o));
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">

            <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-white uppercase tracking-widest">Order Command</h1>
                    <p className="text-gray-400 mt-2">View real-time customer details and items directly inline.</p>
                </div>
            </Reveal>

            {/* Controls */}
            <Reveal delay={0.1} direction="up" className="glass border brutalist-border !border-gray-800 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders (ID, Customer)..."
                        className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-salwa-yellow transition-colors"
                    />
                </div>
                <div className="bg-[#111] border border-gray-800 px-4 py-2 flex items-center gap-3">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Total Orders</span>
                    <span className="text-salwa-yellow font-bold">{orders.length}</span>
                </div>
            </Reveal>

            {/* Data Table */}
            <Reveal delay={0.2} direction="up" className="glass border brutalist-border !border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 border-r border-gray-800">Order ID</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 border-r border-gray-800">Date/Time</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 border-r border-gray-800 min-w-[250px]">Buyer Details</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 border-r border-gray-800 min-w-[250px]">Items Ordered</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 border-r border-gray-800">Status & Total</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 text-right min-w-[120px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map((order) => (
                                <tr key={order._id || order.trackingId} className="hover:bg-gray-900/50 transition-colors group">
                                    <td className="py-4 px-6 text-white font-medium align-top whitespace-nowrap border-r border-gray-800"><span className="text-salwa-yellow">#</span>{order.trackingId}</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm align-top whitespace-nowrap border-r border-gray-800">{order.createdAt}</td>
                                    <td className="py-4 px-6 align-top border-r border-gray-800">
                                        <p className="text-white font-bold">{order.customerName}</p>
                                        <p className="text-gray-400 text-xs mt-1 bg-black p-1 inline-block border border-gray-800">{order.customerPhone} {order.customerEmail && order.customerEmail !== "N/A" && `• ${order.customerEmail}`}</p>
                                        <p className="text-gray-500 text-xs mt-2 leading-relaxed max-w-[220px]">{order.customerAddress}</p>
                                    </td>
                                    <td className="py-4 px-6 align-top max-w-[280px] border-r border-gray-800">
                                        <div className="space-y-2">
                                            {order.items?.map((item: any, idx: number) => (
                                                <div key={idx} className="text-xs text-gray-400 border border-gray-800 bg-[#050505] p-2 leading-tight">
                                                    <span className="text-white mr-1">{item.quantity}x</span> 
                                                    {item.name} 
                                                    <div className="text-salwa-yellow mt-1 font-medium">Rs {item.price?.toLocaleString()}</div>
                                                </div>
                                            ))}
                                            {(!order.items || order.items.length === 0) && (
                                                <span className="text-gray-500 text-xs">No items in payload</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top border-r border-gray-800">
                                        <div className="flex flex-col space-y-4">
                                            <span className={`w-max px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded border ${order.status === "Delivered" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    order.status === "Processing" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                }`}>
                                                {order.status}
                                            </span>
                                            <div>
                                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Total Paid</p>
                                                <p className="text-white font-bold whitespace-nowrap text-lg tracking-wide">Rs {order.totalAmount?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right align-top">
                                        <button
                                            onClick={() => toggleStatus(order._id, order.status)}
                                            className="text-[10px] uppercase tracking-widest font-bold border border-gray-700 hover:border-salwa-yellow hover:text-salwa-yellow transition-colors px-3 py-3 bg-[#050505] w-full"
                                        >
                                            Advance Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-500 uppercase tracking-widest text-sm">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Reveal>

        </div>
    );
}
