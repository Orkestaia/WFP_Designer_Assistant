"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { DB_CATEGORIES_MAP } from "@/lib/constants";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
    categoryId: string;
    selectedProduct: Product | null;
    onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ categoryId, selectedProduct, onSelectProduct }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const categoriesToFetch = DB_CATEGORIES_MAP[categoryId] || [];

                let query = supabase
                    .from('products')
                    .select('*')
                    .eq('active', true);

                // MVP: Simple text matching, refined query would be better
                if (categoriesToFetch.length > 0) {
                    // Construct an OR query for categories
                    // Note: This assumes simple string matching. 
                    // Real impl might need a proper text search or normalized category column.
                    // For now, we'll try to match exact category or subcategory
                    const filterString = categoriesToFetch.map(c => `category.ilike.%${c}%`).join(',');
                    query = query.or(filterString);
                }

                const { data, error } = await query.limit(50);

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        }

        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-muted">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
                <p>Loading collection...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                <p className="text-muted">No products found in this category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={onSelectProduct}
                />
            ))}
        </div>
    );
}
