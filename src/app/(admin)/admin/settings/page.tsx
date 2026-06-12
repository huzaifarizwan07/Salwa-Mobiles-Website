"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/animations/Reveal";
import { Settings as SettingsIcon, Percent, AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [discount, setDiscount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const fetchDiscount = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const json = await res.json();
            if (json.success) {
                setDiscount(json.data.discountPercentage || 0);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscount();
    }, []);

    const updateDiscount = async (newDiscount: number) => {
        setSaving(true);
        setMessage("");
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ discountPercentage: newDiscount })
            });
            const json = await res.json();
            if (json.success) {
                setDiscount(json.discountPercentage);
                setMessage("✅ Global discount updated successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("❌ Failed to update discount.");
            }
        } catch (e) {
            console.error(e);
            setMessage("❌ Failed to update discount.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-white uppercase tracking-widest flex items-center gap-3">
                        <SettingsIcon className="text-salwa-yellow" />
                        System Settings
                    </h1>
                    <p className="text-gray-400 mt-2">Manage global configurations for the overarching store experience.</p>
                </div>
            </Reveal>

            {/* Global Discount Settings */}
            <Reveal delay={0.1} direction="up" className="glass border brutalist-border !border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Percent className="text-salwa-yellow" size={24} />
                    <h2 className="text-xl font-heading text-white tracking-widest uppercase">Global Store Discount</h2>
                </div>
                
                <p className="text-gray-400 mb-6 max-w-2xl text-sm leading-relaxed">
                    Set a site-wide percentage text discount. This will display a red alert banner, cross out original prices, and drop the calculated prices down for all buyers actively shopping on the site.
                </p>

                {loading ? (
                    <div className="text-salwa-yellow animate-pulse">Loading current configuration...</div>
                ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-12 pr-4 py-3 font-mono focus:outline-none focus:border-salwa-yellow transition-colors"
                                placeholder="Example: 25"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row w-full gap-3">
                            <button
                                onClick={() => updateDiscount(discount)}
                                disabled={saving}
                                className="bg-salwa-yellow text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-white transition-colors disabled:opacity-50 min-w-[200px]"
                            >
                                {saving ? "Saving..." : "Apply Discount"}
                            </button>
                            
                            <button
                                onClick={() => updateDiscount(0)}
                                disabled={saving || discount === 0}
                                className="bg-red-500/10 text-red-500 border border-red-500/30 font-bold uppercase tracking-widest px-8 py-3 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                            >
                                Remove Discount
                            </button>
                        </div>
                    </div>
                )}
                
                {message && (
                    <div className="mt-4 p-3 bg-[#0a0a0a] border border-gray-800 text-white text-sm animate-fade-in inline-block rounded">
                        {message}
                    </div>
                )}
            </Reveal>

            {/* Potentially other settings in the future */}
            <Reveal delay={0.2} direction="up" className="glass border brutalist-border !border-gray-800 p-8opacity-50">
                <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="text-gray-500" size={24} />
                    <h2 className="text-xl font-heading text-gray-500 tracking-widest uppercase">Other Configurations</h2>
                </div>
                <p className="text-gray-600 text-sm">More administrative capabilities will become available in upcoming system updates.</p>
            </Reveal>

        </div>
    );
}
