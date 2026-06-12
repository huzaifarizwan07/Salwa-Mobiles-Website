"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SalwaEntrance() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide after 2.5s
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                >
                    {/* Yellow Wipe Effect */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "circInOut" }}
                        className="absolute inset-0 bg-salwa-yellow origin-left z-0"
                    />

                    {/* Text Reveal */}
                    <motion.div
                        initial={{ scale: 2, opacity: 0, color: "#000000" }}
                        animate={{ scale: 1, opacity: 1, color: "#ffffff" }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                        className="relative z-10 text-6xl md:text-9xl font-heading uppercase tracking-[0.2em] mix-blend-difference"
                    >
                        Salwa
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
