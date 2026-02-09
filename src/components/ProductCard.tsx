"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";
import clsx from "clsx";

interface ProductCardProps {
    product: Product;
    isSelected: boolean;
    onSelect: (product: Product) => void;
}

export default function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={() => onSelect(product)}
            className={clsx(
                "cursor-pointer rounded-2xl overflow-hidden relative group transition-all duration-300 h-full",
                isSelected
                    ? "ring-2 ring-primary shadow-[0_0_40px_rgba(38,179,204,0.25)] bg-surface-light"
                    : "glass hover:bg-surface/60 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30"
            )}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
                {isSelected && (
                    <div className="absolute inset-0 bg-primary/10 z-10 pointer-events-none mix-blend-overlay" />
                )}

                {/* Selection Badge - Gold/Primary Accent */}
                <div className={clsx(
                    "absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md border border-white/10",
                    isSelected ? "bg-primary text-white scale-100" : "bg-black/40 text-white/50 scale-0 group-hover:scale-100"
                )}>
                    <Check className="w-4 h-4 text-white font-bold" />
                </div>

                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-muted text-xs">
                        No Image
                    </div>
                )}

                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D22] via-[#0B1D22]/40 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <h4 className={clsx(
                    "font-bold text-lg leading-tight mb-2 transition-colors",
                    isSelected ? "text-primary-light" : "text-white group-hover:text-primary-light"
                )}>
                    {product.name}
                </h4>
                {product.price && (
                    <div className="flex items-center gap-2">
                        <span className="text-accent font-semibold text-base">
                            ${product.price.toLocaleString()}
                        </span>
                        {isSelected && <span className="text-xs text-primary/70 font-medium px-2 py-0.5 rounded-full bg-primary/10">Selected</span>}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
