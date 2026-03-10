"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "We define your vision.",
        description: "We map where you are and design the path forward. Strategy without execution is fiction.",
        number: "1"
    },
    {
        title: "We build Systems",
        description: "We eliminate waste and build frameworks that scale with your growth.",
        number: "2"
    },
    {
        title: "We track performance",
        description: "Systems track what matters. Data informs decisions. Accountability stays sharp.",
        number: "3"
    }
];

export default function Process() {
    return (
        <section className="py-24 bg-[#0a0a0a] text-white px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Process</h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">
                        We execute, not theorize. Our consulting is built on implementation, not recommendations that gather dust on shelves.
                    </p>
                </motion.div>

                <div className="space-y-4 md:space-y-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.005,
                                backgroundColor: "rgba(225, 29, 72, 0.03)",
                            }}
                            className="group flex flex-col md:flex-row items-start md:items-center border border-white/5 bg-white/[0.01] p-8 md:p-12 gap-8 md:gap-16 transition-all duration-300 rounded-[2rem] cursor-default hover:border-primary/20 hover:shadow-premium"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary font-mono text-xl font-bold border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-glow">
                                {step.number}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-primary"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
