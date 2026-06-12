"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/animations/Reveal";
import { ShoppingBag, ShieldCheck, Truck, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useDiscount } from "@/context/DiscountContext";
import { useParams } from "next/navigation";

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = useParams();
    const { addToCart, setIsCheckoutMode } = useCart();
    const { discountPercentage } = useDiscount();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<string | null>("specs");
    const [activeImage, setActiveImage] = useState<string>("");

    const discountedPrice = discountPercentage > 0 && product ? Math.floor(product.price - (product.price * (discountPercentage / 100))) : (product?.price || 0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // useParams hook gives us the resolved params
                const res = await fetch(`/api/products/${params.id}`);
                const json = await res.json();
                if (json.success) {
                    setProduct(json.data);
                    setActiveImage(json.data.images && json.data.images.length > 0 ? json.data.images[0] : (json.data.imageUrl || "/iphone.png"));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-salwa-yellow border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-heading uppercase tracking-widest text-2xl">
                Product Not Found
            </div>
        );
    }

    // Use default specs/box if none exist in DB
    const displaySpecs = product.specs && product.specs.length > 0 ? product.specs : [
        { label: "Material", value: "Premium Build" },
        { label: "Status", value: product.status }
    ];

    const displayBox = product.inTheBox && product.inTheBox.length > 0 ? product.inTheBox : [
        product.name,
        "Documentation",
        product.category === "Phones" ? "Charging Cable" : ""
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-black">
            {/* Top Bar Navigation */}
            <div className="border-b brutalist-border !border-gray-800 p-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-salwa-yellow transition-colors font-medium uppercase tracking-widest text-sm">
                        <ArrowLeft size={16} className="mr-2" /> Back to Vault
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Product Media Gallery (The Lab Viewer) */}
                <Reveal direction="right" className="relative group">
                    <div className="sticky top-32">
                        <div className="aspect-square bg-[#050505] border brutalist-border !border-gray-800 flex items-center justify-center relative overflow-hidden group-hover:!border-salwa-yellow transition-colors duration-500 cursor-crosshair">
                            {/* Dummy 3D Object Representation / Image */}
                            <div className="absolute inset-0 bg-salwa-yellow opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />
                            <div className="w-80 h-[600px] border border-gray-800 rounded-[3rem] p-2 bg-gradient-to-br from-gray-900 to-black relative shadow-2xl transition-transform duration-700 ease-out hover:scale-105 hover:rotate-y-12 perspective-1000">
                                {/* Glowing Aura on Hover */}
                                <div className="absolute inset-0 bg-salwa-yellow/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                {/* Dummy Screen or dynamic Image */}
                                <div className="w-full h-full rounded-[2.5rem] bg-black border border-gray-700 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-50 transition-all duration-300" style={{ backgroundImage: `url('${activeImage}')` }} />
                                </div>
                            </div>

                            {/* Interaction Hint */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-gray-800 px-4 py-2 text-xs font-heading uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-salwa-yellow animate-pulse" />
                                Interactive Lab View
                            </div>
                        </div>

                        {product.images && product.images.length > 0 && (
                            <div className="flex gap-4 mt-6 overflow-x-auto pb-2 justify-center">
                                {product.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-20 h-20 flex-shrink-0 border bg-[#050505] relative overflow-hidden transition-all duration-300 ${activeImage === img ? 'border-salwa-yellow shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'border-gray-800 opacity-50 hover:opacity-100'}`}
                                    >
                                        <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all" style={{ backgroundImage: `url('${img}')` }} />
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>
                </Reveal>

                {/* Product Info */}
                <Reveal direction="left" className="space-y-8">
                    <div>
                        <span className="text-salwa-yellow text-sm font-bold uppercase tracking-widest mb-2 block">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading uppercase leading-tight mb-4">{product.name}</h1>
                        {discountPercentage > 0 ? (
                            <div className="flex flex-col">
                                <p className="text-xl font-medium tracking-wide text-gray-500 line-through">Rs {product.price?.toLocaleString()}</p>
                                <p className="text-3xl font-medium tracking-wide text-salwa-yellow">Rs {discountedPrice.toLocaleString()}</p>
                            </div>
                        ) : (
                            <p className="text-3xl font-medium tracking-wide text-white">Rs {product.price?.toLocaleString()}</p>
                        )}
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        {product.description || "Premium quality guaranteed. The absolute pinnacle of mobile engineering and accessories."}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 py-6 border-y brutalist-border !border-gray-800">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-salwa-yellow" size={24} />
                            <div>
                                <p className="text-white font-bold uppercase text-sm tracking-wider">1 Year</p>
                                <p className="text-gray-500 text-xs uppercase">Official Warranty</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Truck className="text-salwa-yellow" size={24} />
                            <div>
                                <p className="text-white font-bold uppercase text-sm tracking-wider">Fast Dispatch</p>
                                <p className="text-gray-500 text-xs uppercase">Nationwide Shipping</p>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Banner */}
                    <div className={`border-2 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-300 ${product.status === "Out of Stock"
                        ? "bg-[#111] border-gray-800"
                        : "bg-[#111] border-salwa-yellow group hover:bg-salwa-yellow"
                        }`}>
                        <div className="text-center sm:text-left">
                            <p className={`font-heading uppercase tracking-widest text-sm transition-colors ${product.status === "Out of Stock" ? "text-red-500" : "text-salwa-yellow group-hover:text-black"}`}>
                                {product.status === "Low Stock" ? "Limited Stock Available" : product.status === "Out of Stock" ? "Currently Unavailable" : "In Stock"}
                            </p>
                            <p className={`font-medium transition-colors ${product.status === "Out of Stock" ? "text-gray-500" : "text-white group-hover:text-black"}`}>
                                Secure your device today.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                            <button
                                onClick={() => {
                                    addToCart({
                                        _id: product._id,
                                        name: product.name,
                                        price: discountedPrice,
                                        image: activeImage,
                                        quantity: 1,
                                        stock: product.stock
                                    });
                                    setIsCheckoutMode(true);
                                }}
                                disabled={product.status === "Out of Stock"}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-salwa-yellow text-black font-bold uppercase tracking-widest py-4 px-8 border border-salwa-yellow hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Buy Now</span>
                            </button>
                            <button
                                onClick={() => addToCart({
                                    _id: product._id,
                                    name: product.name,
                                    price: discountedPrice,
                                    image: activeImage,
                                    quantity: 1,
                                    stock: product.stock
                                })}
                                disabled={product.status === "Out of Stock"}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-salwa-yellow font-bold uppercase tracking-widest py-4 px-8 border border-gray-700 hover:border-salwa-yellow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag size={20} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="mt-12 space-y-4">
                        {/* Tech Specs */}
                        <div className="border brutalist-border !border-gray-800 bg-[#050505]">
                            <button
                                onClick={() => toggleAccordion("specs")}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-900 transition-colors"
                            >
                                <span className="font-heading text-lg uppercase tracking-widest text-white">Tech Specs</span>
                                {activeAccordion === "specs" ? <ChevronUp className="text-salwa-yellow" /> : <ChevronDown className="text-gray-500" />}
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "specs" ? "max-h-[500px]" : "max-h-0"}`}>
                                <div className="p-6 pt-0 border-t border-gray-800">
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {displaySpecs.map((spec: any, i: number) => (
                                                <tr key={i} className="border-b border-gray-800 last:border-0">
                                                    <td className="py-4 text-gray-500 uppercase tracking-wider w-1/3 align-top">{spec.label}</td>
                                                    <td className="py-4 text-white">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* In the Box */}
                        <div className="border brutalist-border !border-gray-800 bg-[#050505]">
                            <button
                                onClick={() => toggleAccordion("box")}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-900 transition-colors"
                            >
                                <span className="font-heading text-lg uppercase tracking-widest text-white">In the Box</span>
                                {activeAccordion === "box" ? <ChevronUp className="text-salwa-yellow" /> : <ChevronDown className="text-gray-500" />}
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "box" ? "max-h-[500px]" : "max-h-0"}`}>
                                <div className="p-6 pt-0 border-t border-gray-800">
                                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                                        {displayBox.map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </Reveal>
            </div>
        </div>
    );
}
