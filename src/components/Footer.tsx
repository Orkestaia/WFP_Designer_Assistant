import Link from "next/link";
import { Droplets } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-8 md:py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
                            <Droplets className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-white tracking-tight">Water Feature Pros</span>
                    </div>

                    <div className="text-muted text-sm text-center md:text-right">
                        <p className="mb-2">Powered by AI Visualization</p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                            <Link
                                href="https://waterfeaturepros.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                Visit Our Store
                            </Link>
                            <span>&copy; {new Date().getFullYear()} Water Feature Pros</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
