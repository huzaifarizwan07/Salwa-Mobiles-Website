"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/animations/Reveal";
import { Filter, SlidersHorizontal, Package } from "lucide-react";

export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Phones", "Audio", "Protection", "Power", "Wearables"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const json = await res.json();
                if (json.success) {
                    // Only show active or low stock items to buyers
                    setProducts(json.data.filter((p: any) => p.status !== "Out of Stock"));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Header Banner */}
            <div className="bg-[#050505] border-b brutalist-border !border-gray-800 py-16 px-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-salwa-yellow/5 blur-3xl rounded-full" />
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between">
                    <Reveal direction="left">
                        <h1 className="text-5xl md:text-7xl font-heading uppercase text-white mb-4">The <span className="text-salwa-yellow">Vault</span></h1>
                        <p className="text-gray-400 max-w-lg">
                            Explore our curated collection of elite mobile hardware and accessories. Performance meets design.
                        </p>
                    </Reveal>

                    <Reveal direction="right" delay={0.2} className="hidden md:flex items-center space-x-2 text-salwa-yellow mt-8 md:mt-0">
                        <Package size={24} />
                        <span className="font-heading uppercase tracking-widest text-xl">
                            {loading ? "..." : products.length} ITEMS
                        </span>
                    </Reveal>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filter Menu */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <Reveal direction="up">
                        <div className="glass p-6 sticky top-32 brutalist-border !border-x-0 !border-t-0 border-b lg:!border lg:border-gray-800 rounded-none z-10">
                            <div className="flex items-center space-x-2 text-salwa-yellow mb-6 font-heading uppercase tracking-widest">
                                <SlidersHorizontal size={20} />
                                <h2>Filters</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide mb-3 flex items-center justify-between text-sm">
                                        Categories <Filter size={14} className="text-gray-500" />
                                    </h3>
                                    <ul className="space-y-2">
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={`w-full text-left px-3 py-2 text-sm uppercase tracking-wider transition-colors border-l-2 ${activeCategory === cat
                                                        ? "border-salwa-yellow text-salwa-yellow bg-salwa-yellow/10"
                                                        : "border-transparent text-gray-400 hover:text-white hover:border-gray-600"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="py-24 text-center border brutalist-border !border-gray-800 bg-[#0a0a0a]">
                            <div className="w-12 h-12 border-4 border-salwa-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-salwa-yellow font-heading uppercase tracking-widest">Unlocking the vault...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product, index) => (
                                <Reveal key={product._id} delay={index * 0.05} direction="up">
                                    <ProductCard
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        imageUrl={product.imageUrl}
                                        images={product.images}
                                        isNew={product.isNewItem}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="py-24 text-center border brutalist-border !border-gray-800">
                            <p className="text-gray-500 font-heading uppercase tracking-widest text-xl">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
