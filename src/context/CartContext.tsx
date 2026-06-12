"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isCheckoutMode: boolean;
    setIsCheckoutMode: (isCheckoutMode: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutMode, setIsCheckoutMode] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("salwa_cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (e) {
            console.error("Failed to parse cart from local storage", e);
        }
        setIsInitialized(true);
    }, []);

    // Save to local storage on changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("salwa_cart", JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === item._id);
            if (existing) {
                return prev.map(i =>
                    i._id === item._id
                        ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                        : i
                );
            }
            return [...prev, item];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(i => i._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart(prev => prev.map(i => {
            if (i._id === id) {
                return { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) };
            }
            return i;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, isCartOpen, setIsCartOpen, isCheckoutMode, setIsCheckoutMode
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
