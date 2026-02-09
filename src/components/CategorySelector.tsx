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
        <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex gap-4 min-w-max px-2 md:justify-center">
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={clsx(
                                "group relative flex flex-col md:flex-row items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 min-w-[120px] md:min-w-[180px]",
                                isSelected
                                    ? "bg-primary shadow-[0_0_20px_rgba(38,179,204,0.25)]"
                                    : "bg-surface/40 hover:bg-surface/80 border border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className={clsx(
                                "p-2.5 rounded-xl transition-colors",
                                isSelected ? "bg-white/20 text-white" : "bg-white/5 text-muted group-hover:text-primary-light"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className={clsx(
                                    "font-bold text-sm md:text-base transition-colors",
                                    isSelected ? "text-white" : "text-muted group-hover:text-white"
                                )}>
                                    {cat.name}
                                </h3>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
