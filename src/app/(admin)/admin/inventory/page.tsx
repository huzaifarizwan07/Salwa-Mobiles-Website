"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, X } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function InventoryPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "", category: "Phones", price: "", stock: "", status: "Active", images: ["", "", ""]
    });
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const json = await res.json();
            if (json.success) setProducts(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            fetchProducts();
        } catch (e) {
            console.error(e);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    imageUrl: formData.images[0] || "/iphone.png"
                })
            });
            const data = await res.json();

            if (!data.success) {
                setSubmitError(data.error || "Failed to add product. Please check your connection.");
                return;
            }

            setShowModal(false);
            setFormData({ name: "", category: "Phones", price: "", stock: "", status: "Active", images: ["", "", ""] });
            fetchProducts();
        } catch (e: any) {
            console.error(e);
            setSubmitError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-white uppercase tracking-widest">Inventory Manager</h1>
                    <p className="text-gray-400 mt-2">Manage your catalog, stock levels, and pricing.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center space-x-2 bg-salwa-yellow text-black font-bold uppercase tracking-widest py-3 px-6 brutalist-border hover:bg-black hover:text-salwa-yellow transition-colors whitespace-nowrap"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </Reveal>

            {/* Constraints & Table */}
            <Reveal delay={0.1} direction="up" className="glass border brutalist-border !border-gray-800 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-salwa-yellow transition-colors"
                    />
                </div>
            </Reveal>

            <Reveal delay={0.2} direction="up" className="glass border brutalist-border !border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Product Name</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Category</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Price (Rs)</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Stock</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400">Status</th>
                                <th className="py-4 px-6 font-heading uppercase tracking-wider text-xs text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-8 text-salwa-yellow">Loading from database...</td></tr>
                            ) : products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-900/50 transition-colors group">
                                    <td className="py-4 px-6 text-white font-medium">{product.name}</td>
                                    <td className="py-4 px-6 text-gray-400 uppercase text-xs">{product.category}</td>
                                    <td className="py-4 px-6 text-white">{product.price?.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-white">{product.stock}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded ${product.status === "Active" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                                            product.status === "Low Stock" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                                                "bg-red-500/10 text-red-500 border border-red-500/20"
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && products.length === 0 && (
                                <tr><td colSpan={6} className="text-center py-8 text-gray-500 uppercase tracking-widest text-sm">No products found. Add one above.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Reveal>

            {/* Add Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4">
                    <div className="bg-[#0a0a0a] border brutalist-border border-salwa-yellow w-full max-w-lg p-6 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-salwa-yellow"><X size={24} /></button>
                        <h2 className="text-2xl font-heading text-white uppercase tracking-widest mb-6">New Product</h2>
                        {submitError && (
                            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-xs sm:text-sm p-3 text-center rounded">
                                {submitError}
                            </div>
                        )}
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#111] border border-gray-800 text-white p-3 mt-1 focus:border-salwa-yellow outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#111] border border-gray-800 text-white p-3 mt-1 focus:border-salwa-yellow outline-none uppercase text-sm">
                                        <option>Phones</option><option>Audio</option><option>Protection</option><option>Power</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-[#111] border border-gray-800 text-white p-3 mt-1 focus:border-salwa-yellow outline-none uppercase text-sm">
                                        <option>Active</option><option>Low Stock</option><option>Out of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Price (Rs)</label>
                                    <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-[#111] border border-gray-800 text-white p-3 mt-1 focus:border-salwa-yellow outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Stock</label>
                                    <input required type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full bg-[#111] border border-gray-800 text-white p-3 mt-1 focus:border-salwa-yellow outline-none" />
                                </div>
                            </div>
                            <div className="space-y-3 pt-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block">Product Images (Min 3 required)</label>
                                {[0, 1, 2].map((index) => (
                                    <input
                                        key={index}
                                        required
                                        type="url"
                                        placeholder={`Image URL ${index + 1}`}
                                        value={formData.images[index]}
                                        onChange={e => {
                                            const newImages = [...formData.images];
                                            newImages[index] = e.target.value;
                                            setFormData({ ...formData, images: newImages });
                                        }}
                                        className="w-full bg-[#111] border border-gray-800 text-white p-3 focus:border-salwa-yellow outline-none text-sm placeholder:text-gray-700 mt-1"
                                    />
                                ))}
                            </div>
                            <button disabled={isSubmitting} type="submit" className="w-full bg-salwa-yellow text-black font-heading uppercase tracking-widest py-4 mt-6 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? "Connecting to Database..." : "Save Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
