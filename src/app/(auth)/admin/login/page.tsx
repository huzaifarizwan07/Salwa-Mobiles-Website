"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Invalid credentials. Access Denied.");
            }
        } catch (err) {
            setError("System failure. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-salwa-yellow/10 rounded-full blur-[100px] pointer-events-none" />

            <Reveal direction="up" className="w-full max-w-md z-10">
                <div className="border border-gray-800 glass p-8 shadow-2xl relative overflow-hidden group hover:border-salwa-yellow transition-colors duration-500">

                    <div className="text-center mb-10">
                        <Lock className="w-12 h-12 text-salwa-yellow mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <h1 className="text-3xl font-heading text-white tracking-widest uppercase">
                            Command <span className="text-salwa-yellow">Center</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 tracking-wide">RESTRICTED ACCESS</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs uppercase tracking-widest p-3 text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Administrator ID</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-salwa-yellow" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="salwamobiles.pk"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Authentication Code</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-salwa-yellow" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-salwa-yellow transition-colors placeholder:text-gray-700 font-mono tracking-widest"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-salwa-yellow text-black font-heading uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? "Authenticating..." : "Initialize Sequence"}
                        </button>
                    </form>

                </div>
            </Reveal>
        </div>
    );
}
