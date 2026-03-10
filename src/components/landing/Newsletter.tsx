"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would integrate with a newsletter service
        alert(`Subscribed with: ${email}`);
        setEmail("");
    };

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto px-6 relative z-10"
            >
                <div className="bg-gradient-to-br from-primary to-[#7a0d28] rounded-[3rem] p-12 md:p-20 text-center shadow-premium-xl border border-white/10 overflow-hidden relative group">
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Stay ahead of the curve.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
                    >
                        Join thousands of business owners receiving our weekly insights on efficiency and growth.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium"
                        />
                        <button
                            type="submit"
                            className="bg-white text-primary px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
                        >
                            Subscribe
                            <Send className="w-4 h-4" />
                        </button>
                    </motion.form>

                    <p className="mt-8 text-white/50 text-sm italic">
                        No spam. Unsubscribe at any time.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
