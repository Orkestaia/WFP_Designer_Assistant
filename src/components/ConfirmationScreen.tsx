"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useDesignTool } from "@/hooks/useDesignTool";

export default function ConfirmationScreen() {
    const { setStep, setUploadedImage, setFormData, setIsCompleted } = useDesignTool();

    const handleReset = () => {
        setUploadedImage(null);
        setFormData(prev => ({ ...prev, image: null }));
        setIsCompleted(false);
        // Clean reset
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="min-h-[60vh] flex items-center justify-center py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full mx-4 text-center p-8 bg-surface border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl"
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50">
                    <Check className="w-10 h-10 text-green-400" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">You're All Set! 🎉</h2>

                <p className="text-muted mb-8 leading-relaxed">
                    Our AI design assistant is currently working its magic. <br />
                    We'll email your personalized visualization to you in just a few minutes.
                </p>

                <div className="space-y-4">
                    <Link
                        href="https://waterfeaturepros.com"
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-background font-bold rounded-xl hover:shadow-[0_0_20px_rgba(38,179,204,0.4)] transition-all"
                    >
                        Explore Our Full Collection
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-muted hover:text-white transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        Create Another Visualization
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
