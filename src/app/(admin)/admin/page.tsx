"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Package, Users, DollarSign, Bell } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        unitsSold: 0, // Simulated based on stock
        totalProducts: 0,
        lowStock: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/products");
                const json = await res.json();

                if (json.success) {
                    const products = json.data;
                    const lowStockCount = products.filter((p: any) => p.status === "Low Stock" || p.status === "Out of Stock").length;

                    setStats({
                        revenue: 0, // Reset to 0 as user requested
                        unitsSold: 0,
                        totalProducts: products.length,
                        lowStock: lowStockCount
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const STATS_DATA = [
        { label: "Total Revenue", value: `Rs ${stats.revenue.toLocaleString()}`, icon: TrendingUp },
        { label: "Units Sold", value: stats.unitsSold, icon: Package },
        { label: "Total Catalog", value: stats.totalProducts, icon: Users },
        { label: "Avg. Order Value", value: "Rs 0", icon: DollarSign },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-white uppercase tracking-widest">Command Center</h1>
                    <p className="text-gray-400 mt-2">Welcome back, Administrator. Here is your overview.</p>
                </div>
                <div className="flex items-center space-x-2 text-salwa-yellow bg-[#0a0a0a] border border-gray-800 px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-salwa-yellow animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">System Online</span>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS_DATA.map((stat, index) => (
                    <Reveal key={index} delay={index * 0.1} direction="up" className="glass border brutalist-border !border-gray-800 p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon size={64} className="text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 border border-salwa-yellow text-salwa-yellow flex items-center justify-center mb-4">
                                <stat.icon size={20} />
                            </div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-light text-white">
                                {loading ? "..." : stat.value}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Reveal delay={0.4} direction="up" className="lg:col-span-2 glass border brutalist-border !border-gray-800 p-6">
                    <h2 className="text-white font-heading uppercase tracking-widest mb-6">Sales Trajectory</h2>
                    <div className="h-64 border border-gray-800 flex items-end justify-between p-4 bg-[#050505] relative w-full overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-sm font-mono text-gray-500 tracking-widest uppercase">Awaiting Live Sales Data</p>
                        </div>
                        {[1, 1, 1, 1, 1, 1, 1].map((h, i) => (
                            <div key={i} className="w-full mx-1 bg-gray-900 border-t border-gray-800 relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-salwa-yellow text-black text-[10px] font-bold px-2 py-1 opacity-0 transition-opacity whitespace-nowrap">
                                    Rs 0
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.5} direction="left" className="glass border brutalist-border !border-gray-800 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 border-2 border-salwa-yellow rounded-full flex items-center justify-center text-salwa-yellow relative">
                        <Bell size={24} />
                        {stats.lowStock > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-white font-heading uppercase tracking-widest mb-2">System Alerts</h2>
                        <p className="text-gray-400">
                            {loading ? "Scanning inventory..." :
                                stats.lowStock > 0
                                    ? `${stats.lowStock} products require immediate restock.`
                                    : "All systems nominal. Inventory healthy."}
                        </p>
                    </div>
                    <button className="w-full bg-salwa-yellow text-black font-bold uppercase tracking-widest py-3 mt-4 hover:bg-white transition-colors">
                        Review Inventory
                    </button>
                </Reveal>
            </div>

        </div>
    );
}
