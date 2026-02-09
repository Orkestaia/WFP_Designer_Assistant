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
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 min-w-max px-2">
                {CATEGORIES.map((cat, index) => {
                    const Icon = iconMap[cat.icon];
                    const isSelected = selectedCategory === cat.id;

                    return (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onSelect(cat.id)}
                            className={clsx(
                                "group relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 border",
                                isSelected
                                    ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(38,179,204,0.2)]"
                                    : "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10"
                            )}
                        >
                            <div className={clsx(
                                "p-2 rounded-lg transition-colors",
                                isSelected ? "bg-primary text-white" : "bg-white/10 text-muted group-hover:text-white"
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>

                            <div className="text-left">
                                <h3 className={clsx(
                                    "font-semibold text-sm transition-colors",
                                    isSelected ? "text-primary-light" : "text-white group-hover:text-primary-light"
                                )}>
                                    {cat.name}
                                </h3>
                            </div>

                            {isSelected && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 border-2 border-primary rounded-xl z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
