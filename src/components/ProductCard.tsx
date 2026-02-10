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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onClick={() => onSelect(product)}
            className={clsx(
                "cursor-pointer rounded-xl overflow-hidden relative group transition-all duration-200",
                isSelected
                    ? "ring-2 ring-primary shadow-[0_0_20px_rgba(38,179,204,0.3)]"
                    : "ring-1 ring-white/10 hover:ring-primary/50"
            )}
        >
            {/* Square Image Container */}
            <div className="relative aspect-square overflow-hidden bg-white/5">
                {isSelected && (
                    <div className="absolute inset-0 bg-primary/15 z-10 pointer-events-none" />
                )}

                {/* Selection Badge */}
                <div className={clsx(
                    "absolute top-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
                    isSelected ? "bg-primary text-white scale-100" : "bg-black/50 text-white/40 scale-0 group-hover:scale-100"
                )}>
                    <Check className="w-3.5 h-3.5 text-white" />
                </div>

                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-muted text-xs">
                        No Image
                    </div>
                )}
            </div>

            {/* Compact Info */}
            <div className="p-2.5 bg-surface/80">
                <h4 className={clsx(
                    "font-medium text-sm leading-snug line-clamp-2 transition-colors",
                    isSelected ? "text-primary-light" : "text-white/90"
                )}>
                    {product.name}
                </h4>
                {product.price && (
                    <span className="text-accent font-semibold text-sm mt-1 block">
                        ${product.price.toLocaleString()}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
