"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
    const scrollToTool = () => {
        document.getElementById("design-tool")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-dark/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">AI-Powered Visualization</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary-light">
                        See Your Dream Water Feature <br className="hidden md:block" />
                        <span className="text-primary">In Your Space</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
                        Upload a photo of your garden, pool, or patio and our AI will show you exactly how your chosen water feature will look — installed and flowing.
                    </p>

                    <motion.button
                        onClick={scrollToTool}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-primary text-background font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(38,179,204,0.3)] hover:shadow-[0_0_30px_rgba(38,179,204,0.5)] transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Designing
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted/50"
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}
