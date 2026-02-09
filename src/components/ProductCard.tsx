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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(product)}
            className={clsx(
                "cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 relative group bg-surface",
                isSelected
                    ? "border-primary ring-1 ring-primary shadow-[0_0_20px_rgba(38,179,204,0.15)]"
                    : "border-white/10 hover:border-primary/50 shadow-lg"
            )}
        >
            {/* Selection Indicator */}
            <div className={clsx(
                "absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                isSelected ? "bg-primary scale-100" : "bg-black/50 scale-0 group-hover:scale-100"
            )}>
                <Check className="w-3.5 h-3.5 text-white" />
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-background">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-muted text-xs">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-4 absolute bottom-0 left-0 w-full">
                <h4 className="text-white font-medium text-sm line-clamp-2 leading-tight mb-1">
                    {product.name}
                </h4>
                {product.price && (
                    <p className="text-primary-light font-bold text-sm">
                        ${product.price.toLocaleString()}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
