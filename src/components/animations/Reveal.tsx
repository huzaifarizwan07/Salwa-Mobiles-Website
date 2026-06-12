"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export default function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
    const getVariants = () => {
        switch (direction) {
            case "up": return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
            case "down": return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
            case "left": return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
            case "right": return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
        }
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.17, 0.55, 0.55, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
