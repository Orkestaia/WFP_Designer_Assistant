"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo-wfp.png"
                        alt="Water Feature Pros"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                </Link>

                {/* CTA Button */}
                <a
                    href="#design-tool"
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/25"
                >
                    Start Your Design
                </a>
            </div>
        </header>
    );
}
