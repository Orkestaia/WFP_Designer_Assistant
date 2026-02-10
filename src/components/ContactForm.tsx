"use client";

import { useForm } from "react-hook-form";
import { Sparkles, Loader2 } from "lucide-react";
import clsx from "clsx";
import { DesignFormData } from "@/types";

interface ContactFormProps {
    onSubmit: (data: Partial<DesignFormData>) => void;
    isLoading: boolean;
    isDisabled: boolean;
}

export default function ContactForm({ onSubmit, isLoading, isDisabled }: ContactFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Partial<DesignFormData>>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted mb-1.5">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...register("name", { required: "Name is required" })}
                        className={clsx(
                            "w-full px-4 py-3 rounded-lg bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                            errors.name ? "border-red-500/50" : "border-white/10 focus:border-primary"
                        )}
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-1.5">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        className={clsx(
                            "w-full px-4 py-3 rounded-lg bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                            errors.email ? "border-red-500/50" : "border-white/10 focus:border-primary"
                        )}
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1.5">Phone (Optional)</label>
                    <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="(555) 123-4567"
                    />
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                    id="consent"
                />
                <label htmlFor="consent" className="text-xs text-muted leading-relaxed">
                    I agree to receive my visualization and be contacted by Water Feature Pros regarding my inquiry. Privacy Policy applies.
                </label>
            </div>

            <button
                type="submit"
                disabled={isDisabled || isLoading}
                className={clsx(
                    "w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden",
                    isDisabled
                        ? "bg-white/5 text-muted cursor-not-allowed"
                        : "bg-accent text-background hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(253,204,52,0.4)]"
                )}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Visualization...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Visualize My Space
                    </>
                )}
            </button>
        </form>
    );
}
