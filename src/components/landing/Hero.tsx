"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute min-w-full min-h-full object-cover opacity-40"
                >
                    <source src="/aider.mp4" type="video/mp4" />
                </video>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-1" />
            </div>

            {/* Animated Dot Grid */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_70%)]"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center mt-[-4rem]">
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Systems that work, <br className="hidden md:block" />
                    <span className="text-blue-500">results that matter.</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    AIDER partners with businesses to design, implement, and manage operational systems that drive real performance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <a href="#services" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-colors">
                        Get Started Now
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-20 w-full overflow-hidden whitespace-nowrap py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="flex animate-marquee gap-24 items-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-24">
                            <img src="/logo.png" alt="Client Logo" className="h-7 md:h-10 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity" />
                            <span className="text-xl font-bold tracking-tighter opacity-10 uppercase">Aider Partner</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500 text-xs z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="mb-2">Scroll down</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-gray-500 to-transparent"></div>
            </motion.div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
            `}</style>
        </section>
    );
}
