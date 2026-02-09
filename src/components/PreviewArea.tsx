"use client";

import Image from "next/image";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface PreviewAreaProps {
    selectedProduct: Product | null;
    uploadedImage: string | null;
    onClearImage?: () => void;
}

export default function PreviewArea({ selectedProduct, uploadedImage, onClearImage }: PreviewAreaProps) {
    return (
        <div className="sticky top-24">
            <div className="relative aspect-[4/5] w-full bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">

                <AnimatePresence mode="wait">
                    {/* Case 1: Uploaded User Image */}
                    {uploadedImage ? (
                        <motion.div
                            key="uploaded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10"
                        >
                            <Image
                                src={uploadedImage}
                                alt="Your space"
                                fill
                                className="object-cover"
                            />

                            {/* Overlay with selected product info if exists */}
                            {selectedProduct && (
                                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
                                    {selectedProduct.image_url && (
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                            <Image src={selectedProduct.image_url} alt="Product thumb" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs text-primary-light font-medium uppercase tracking-wider">Visualizing</p>
                                        <p className="text-white text-sm font-semibold truncate">{selectedProduct.name}</p>
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={onClearImage}
                                    className="bg-black/50 hover:bg-red-500/80 p-2 rounded-full text-white backdrop-blur transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ) : selectedProduct ? (
                        // Case 2: Selected Product Preview
                        <motion.div
                            key="product"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-surface via-background to-black"
                        >
                            {selectedProduct.image_url && (
                                <div className="relative w-full h-full p-8 md:p-12">
                                    <Image
                                        src={selectedProduct.image_url}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedProduct.name}</h3>
                                <div className="flex items-center gap-2 text-primary-light">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm">Ready to visualize in your space</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // Case 3: Empty State
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/5"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20">
                                <Sparkles className="w-8 h-8 text-primary/50" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Detailed Preview</h3>
                            <p className="text-muted text-sm max-w-xs">
                                Select a product from the left to see details, then upload your photo to visualize.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
