"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
    const scrollToTool = () => {
        const element = document.getElementById("design-tool");
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] opacity-40 mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-dark/30 rounded-full blur-[120px] opacity-30" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface/50 border border-white/10 text-primary-light mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(38,179,204,0.15)] ring-1 ring-white/5"
                    >
                        <Sparkles className="w-4 h-4 fill-primary-light" />
                        <span className="text-sm font-semibold tracking-wide uppercase">AI Visualization Beta</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 block mb-2">
                            Visualize Your
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-white to-primary block drop-shadow-[0_0_30px_rgba(38,179,204,0.3)]">
                            Perfect Space
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted/90 max-w-2xl mb-12 leading-relaxed font-light">
                        Transform your garden, pool, or patio instantly. Upload a photo and see our premium water features integrated into your environment with photorealistic AI precision.
                    </p>

                    <motion.button
                        onClick={scrollToTool}
                        whileHover={{ scale: 1.02, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-10 py-5 bg-gradient-to-br from-primary to-primary-dark text-white font-bold rounded-2xl text-lg shadow-[0_10px_30px_rgba(38,179,204,0.3)] hover:shadow-[0_20px_40px_rgba(38,179,204,0.4)] transition-all overflow-hidden border border-white/10"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Start Designing Now
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </motion.button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
