"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import SalwaEntrance from "@/components/animations/SalwaEntrance";
import Reveal from "@/components/animations/Reveal";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
    const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const json = await res.json();
                if (json.success) {
                    setTrendingProducts(json.data.slice(0, 4));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <SalwaEntrance />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-salwa-yellow/5 rounded-full blur-[100px] z-0 pointer-events-none" />
                <div className="absolute right-0 top-0 w-1/3 h-full border-l brutalist-border !border-gray-800 z-0 opacity-50" />

                <div className="max-w-7xl mx-auto w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8">
                        <Reveal direction="up" delay={2.5}>
                            <h1 className="text-6xl md:text-8xl font-heading uppercase tracking-tighter leading-[0.9]">
                                Future-Proof <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-salwa-yellow to-yellow-600">
                                    Your Grip.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal direction="up" delay={2.7}>
                            <p className="text-gray-400 text-lg md:text-xl max-w-lg">
                                Premium mobile hardware, elite accessories, and a yellow-standard of service. Elevate your tech game with Salwa Mobiles.
                            </p>
                        </Reveal>

                        <Reveal direction="up" delay={2.9}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/shop" className="group flex items-center justify-center space-x-2 bg-salwa-yellow text-black font-bold uppercase tracking-widest py-4 px-8 brutalist-border hover:bg-black hover:text-salwa-yellow transition-colors">
                                    <span>Enter The Vault</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/about" className="flex items-center justify-center space-x-2 bg-transparent text-white font-bold uppercase tracking-widest py-4 px-8 border brutalist-border !border-gray-600 hover:!border-salwa-yellow hover:text-salwa-yellow transition-colors">
                                    <span>Our Story</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal direction="left" delay={3.1} className="relative h-[60vh] flex items-center justify-center hidden lg:flex">
                        {/* Abstract 3D Phone Representation */}
                        <div className="relative w-72 h-[600px] border-4 border-gray-800 rounded-[3rem] p-2 rotate-12 hover:rotate-0 transition-all duration-700 bg-gradient-to-tr from-black to-gray-900 shadow-[0_0_100px_rgba(255,215,0,0.15)] group">
                            <div className="absolute inset-0 bg-salwa-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10 rounded-full" />
                            <div className="w-full h-full rounded-[2.5rem] border border-gray-700 bg-black overflow-hidden relative">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" /> {/* Notch */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-100 transition-opacity duration-1000 scale-110 group-hover:scale-100 mix-blend-luminosity hover:mix-blend-normal" />
                            </div>
                        </div>
                    </Reveal>

                </div>

                {/* Vertical Text Background Layer */}
                <div className="absolute left-0 top-0 h-full hidden xl:flex items-center -ml-20 pointer-events-none opacity-[0.03] z-0">
                    <span className="font-heading text-[15rem] leading-none uppercase tracking-tighter [writing-mode:vertical-rl] rotate-180">
                        Salwa
                    </span>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-24 relative z-10 bg-black">
                <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
                    <Reveal direction="right">
                        <h2 className="text-4xl md:text-5xl font-heading uppercase flex items-center gap-4">
                            <Zap className="text-salwa-yellow" size={40} />
                            Trending Now
                        </h2>
                        <div className="w-24 h-1 bg-salwa-yellow mt-4" />
                    </Reveal>

                    <Reveal direction="left">
                        <Link href="/shop" className="hidden md:flex items-center text-gray-400 hover:text-salwa-yellow font-medium uppercase tracking-widest transition-colors group">
                            View All <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>

                {/* Horizontal Scroll Grid */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="col-span-full py-12 text-center text-salwa-yellow font-heading uppercase tracking-widest text-xl animate-pulse">
                                Accessing Vault Data...
                            </div>
                        ) : trendingProducts.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-500 font-heading uppercase tracking-widest text-xl">
                                Vault Currently Empty
                            </div>
                        ) : (
                            trendingProducts.map((product, index) => (
                                <Reveal key={product._id} delay={index * 0.1} direction="up">
                                    <ProductCard id={product._id} name={product.name} category={product.category} price={product.price} imageUrl={product.imageUrl} images={product.images} isNew={product.isNewItem} />
                                </Reveal>
                            ))
                        )}
                    </div>

                    <div className="mt-8 flex justify-center md:hidden">
                        <Link href="/shop" className="flex items-center text-salwa-yellow font-bold uppercase tracking-widest">
                            View All Vault Items <ChevronRight size={20} className="ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Category Banner */}
            <section className="border-y brutalist-border !border-x-0 !border-gray-800 bg-[#050505] overflow-hidden">
                <div className="flex w-max animate-[glitch_20s_linear_infinite] opacity-30 py-4">
                    {/* Marquee effect */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex space-x-16 px-8 items-center font-heading text-4xl uppercase tracking-widest whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-salwa-yellow to-gray-500">
                            <span>Phones</span> <span className="text-yellow-600">•</span>
                            <span>Audio</span> <span className="text-yellow-600">•</span>
                            <span>Protection</span> <span className="text-yellow-600">•</span>
                            <span>Power Banks</span> <span className="text-yellow-600">•</span>
                            <span>Wearables</span> <span className="text-yellow-600">•</span>
                        </div>
                    ))}
                </div>
            </section>

        </>
    );
}
