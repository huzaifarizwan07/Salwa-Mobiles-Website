"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DiscountContextType {
    discountPercentage: number;
    loading: boolean;
}

const DiscountContext = createContext<DiscountContextType>({
    discountPercentage: 0,
    loading: true,
});

export const DiscountProvider = ({ children }: { children: React.ReactNode }) => {
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const res = await fetch("/api/settings");
                const json = await res.json();
                if (json.success && json.data) {
                    setDiscountPercentage(json.data.discountPercentage || 0);
                }
            } catch (error) {
                console.error("Failed to fetch global discount", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscount();
    }, []);

    return (
        <DiscountContext.Provider value={{ discountPercentage, loading }}>
            {children}
        </DiscountContext.Provider>
    );
};

export const useDiscount = () => useContext(DiscountContext);
