"use client";

import { motion } from "framer-motion";
import { Droplets, Camera, Sparkles } from "lucide-react";

const steps = [
    {
        icon: Droplets,
        title: "Choose",
        description: "Browse our collection and select the water feature you love."
    },
    {
        icon: Camera,
        title: "Upload",
        description: "Take a photo of your garden, pool, or patio area."
    },
    {
        icon: Sparkles,
        title: "Visualize",
        description: "Receive a realistic preview of your space with the water feature installed."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-surface/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted text-lg">Three simple steps to your dream space</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-surface border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(38,179,204,0.15)] transition-all duration-300">
                                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-light transition-colors">
                                    {index + 1}. {step.title}
                                </h3>

                                <p className="text-muted leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
