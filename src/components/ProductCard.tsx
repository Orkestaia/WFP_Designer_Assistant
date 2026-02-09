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
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onSelect(product)}
            className={clsx(
                "cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 relative group bg-surface h-full",
                isSelected
                    ? "ring-2 ring-primary shadow-[0_0_30px_rgba(38,179,204,0.2)] scale-[1.02]"
                    : "hover:shadow-2xl border border-white/5 hover:border-white/10"
            )}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-white/5 to-white/0">
                {isSelected && (
                    <div className="absolute inset-0 bg-primary/10 z-10 pointer-events-none" />
                )}

                {/* Checkmark Badge */}
                <div className={clsx(
                    "absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md",
                    isSelected ? "bg-primary text-white scale-100" : "bg-black/40 text-white/50 scale-0 group-hover:scale-100"
                )}>
                    <Check className="w-4 h-4 text-white" />
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end">
                <h4 className="text-white font-semibold text-base leading-snug mb-1 drop-shadow-md group-hover:text-primary-light transition-colors">
                    {product.name}
                </h4>
                {product.price && (
                    <p className="text-zinc-400 font-medium text-sm">
                        ${product.price.toLocaleString()}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
