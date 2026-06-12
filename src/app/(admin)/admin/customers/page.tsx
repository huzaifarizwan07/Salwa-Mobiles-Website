"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/animations/Reveal";
import { Users, Search, ShoppingBag } from "lucide-react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const res = await fetch("/api/admin/customers");
            const json = await res.json();
            if (json.success) setCustomers(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-white uppercase tracking-widest flex items-center gap-3">
                        <Users className="text-salwa-yellow" />
                        Customer Database
                    </h1>
                    <p className="text-gray-400 mt-2">View all unique buyers and their total lifetime value.</p>
                </div>
            </Reveal>

            {/* Constraints & Table */}
            <Reveal delay={0.1} direction="up" className="glass border brutalist-border !border-gray-800 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-salwa-yellow transition-colors"
                    />
                </div>
                <div className="bg-[#111] border border-gray-800 px-4 py-2 flex items-center gap-3">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Total Customers</span>
                    <span className="text-salwa-yellow font-bold">{customers.length}</span>
                </div>
            </Reveal>

            <Reveal delay={0.2} direction="up" className="glass border brutalist-border !border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Name</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Contact</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Total Orders</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Total Spent</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Last Order</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-8 text-salwa-yellow">Loading from database...</td></tr>
                            ) : customers.map((c, i) => (
                                <tr key={i} className="hover:bg-gray-900/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="text-white font-medium">{c.name}</p>
                                        <p className="text-gray-500 text-xs mt-1 truncate max-w-[200px]">{c.address}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-white font-mono text-sm">{c.phone}</p>
                                        <p className="text-gray-500 text-xs mt-1">{c.email || "No Email"}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag size={14} className="text-salwa-yellow" />
                                            <span className="text-white">{c.totalOrders}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-medium text-salwa-yellow">Rs {c.totalSpent?.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">
                                        {new Date(c.lastOrderDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {!loading && customers.length === 0 && (
                                <tr><td colSpan={5} className="text-center py-8 text-gray-500 uppercase tracking-widest text-sm">No customers found. Share your store link!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Reveal>
        </div>
    );
}
