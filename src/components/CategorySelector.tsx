"use client";

import { motion } from "framer-motion";
import { TreeDeciduous, BrickWall, Waves, Flame, Home, LucideIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import clsx from "clsx";

const iconMap: Record<string, LucideIcon> = {
    TreeDeciduous,
    BrickWall,
    Waves,
    Flame,
    Home
};

interface CategorySelectorProps {
    selectedCategory: string | null;
    onSelect: (id: string) => void;
}

export default function CategorySelector({ selectedCategory, onSelect }: CategorySelectorProps) {
    return (
        <div className="w-full overflow-x-auto pb-8 pt-2 hide-scrollbar">
            <div className="flex gap-4 min-w-max px-4 md:justify-center">
                {CATEGORIES.map((cat, index) => {
                    const Icon = iconMap[cat.icon];
                    const isSelected = selectedCategory === cat.id;

                    return (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => onSelect(cat.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={clsx(
                                "relative flex items-center gap-2.5 px-6 py-3 rounded-full transition-all duration-300 border backdrop-blur-md",
                                isSelected
                                    ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(38,179,204,0.4)]"
                                    : "bg-surface/30 text-slate-300 border-white/5 hover:bg-surface/50 hover:border-white/20 hover:text-white"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5", isSelected ? "text-white" : "text-primary")} />

                            <span className="font-semibold text-sm whitespace-nowrap">
                                {cat.name}
                            </span>

                            {isSelected && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 rounded-full border-2 border-white/20 z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
