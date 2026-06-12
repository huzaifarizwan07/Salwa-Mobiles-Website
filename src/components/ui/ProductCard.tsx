"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useDiscount } from "@/context/DiscountContext";

interface ProductCardProps {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    images?: string[];
    isNew?: boolean;
    stock?: number;
}

export default function ProductCard({ id, name, category, price, imageUrl, images, isNew, stock = 10 }: ProductCardProps) {
    const { addToCart, setIsCheckoutMode } = useCart();
    const { discountPercentage } = useDiscount();
    const displayImage = images && images.length > 0 ? images[0] : (imageUrl || "/iphone.png");
    
    const discountedPrice = discountPercentage > 0 ? Math.floor(price - (price * (discountPercentage / 100))) : price;
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative flex flex-col bg-[#0a0a0a] border border-gray-800 hover:border-salwa-yellow transition-colors duration-300"
        >
            {/* Image Container */}
            <Link href={`/product/${id}`} className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-[#111] p-6">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-salwa-yellow opacity-0 group-hover:opacity-10 transition-opacity blur-2xl z-0" />

                {/* Circular Halo */}
                <div className="absolute w-40 h-40 rounded-full border border-gray-800 group-hover:border-salwa-yellow/30 transition-colors z-0" />

                {/* Product Image */}
                <div className="z-10 relative w-full h-full p-4">
                    <img src={displayImage} alt={name} className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                </div>

                {isNew && (
                    <span className="absolute top-4 left-4 bg-white text-black text-xs font-bold uppercase tracking-wider px-2 py-1 z-20 brutalist-border !border-black">
                        New Arrival
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <span className="text-salwa-yellow text-xs font-bold uppercase tracking-widest mb-2">{category}</span>
                <Link href={`/product/${id}`} className="block">
                    <h3 className="text-white text-xl font-heading uppercase mb-4 group-hover:text-salwa-yellow transition-colors">{name}</h3>
                </Link>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        {discountPercentage > 0 ? (
                            <>
                                <p className="text-gray-500 text-sm line-through">Rs {price.toLocaleString()}</p>
                                <p className="text-salwa-yellow text-lg font-medium tracking-wide">Rs {discountedPrice.toLocaleString()}</p>
                            </>
                        ) : (
                            <p className="text-white text-lg font-medium tracking-wide">Rs {price.toLocaleString()}</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart({ _id: id, name, price: discountedPrice, image: displayImage, quantity: 1, stock });
                                setIsCheckoutMode(true);
                            }}
                            className="h-10 px-4 flex items-center justify-center bg-salwa-yellow text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all border border-salwa-yellow"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart({ _id: id, name, price: discountedPrice, image: displayImage, quantity: 1, stock });
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-gray-900 border border-gray-700 hover:bg-salwa-yellow hover:text-black hover:border-salwa-yellow transition-all"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom thick border effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-salwa-yellow transition-colors" />
        </motion.div>
    );
}
