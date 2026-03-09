"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-glow/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-glow/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

            <div className="max-w-5xl mx-auto md:mx-0 relative z-10 font-heading">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 w-fit"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
                    <span className="text-xs md:text-sm text-zinc-900/80 font-sans tracking-wide uppercase font-semibold">Automating your Brand Operations</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
                >
                    Systems that work, <br />
                    <span className="text-zinc-900/40">results that matter.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-zinc-900/60 max-w-2xl leading-relaxed mb-10 font-sans"
                >
                    AIDER partners with businesses to design, implement, and manage operational systems that drive real performance. We don&apos;t advise and disappear—we stay until the system works.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="min-w-[180px] h-14 text-lg">
                        Get Started Now
                    </Button>
                    <Button variant="secondary" size="lg" className="min-w-[180px] h-14 text-lg">
                        See Projects
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
