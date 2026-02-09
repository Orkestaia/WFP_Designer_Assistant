import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Placeholder Logo - replace with real SVG later */}
                    <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-background font-bold text-xl group-hover:scale-105 transition-transform">
                        W
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary-light transition-colors">
                        Water Feature Pros
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium shadow-[0_0_15px_rgba(38,179,204,0.1)]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Design Assistant</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
