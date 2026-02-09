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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Immersive Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Main Glow */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[180px] opacity-60 mix-blend-screen" />
                {/* Secondary Accents */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#1d8a9e]/20 rounded-full blur-[140px]" />
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[140px]" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center max-w-6xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary-light mb-12 backdrop-blur-md shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold tracking-wider uppercase text-accent">Premium AI Visualization</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-8 leading-[0.95]">
                        <span className="block text-white drop-shadow-2xl">
                            Visualize
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-primary opacity-90 drop-shadow-[0_0_30px_rgba(38,179,204,0.5)]">
                            Luxury
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-16 leading-relaxed font-light">
                        Experience your space transformed. Upload a photo and let our AI integrate world-class water features into your environment instantly.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={scrollToTool}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative px-12 py-6 bg-gradient-to-r from-[#26b3cc] to-[#1d8a9e] text-white font-bold rounded-2xl text-xl shadow-[0_20px_50px_rgba(38,179,204,0.3)] hover:shadow-[0_20px_60px_rgba(38,179,204,0.5)] transition-all overflow-hidden ring-1 ring-white/20"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Start Your Design
                            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            >
                <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </motion.div>
        </section>
    );
}
