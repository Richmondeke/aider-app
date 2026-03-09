"use client";

import { motion } from "framer-motion";

const services = [
    "Operational Strategy",
    "System Architecture",
    "Process Automation",
    "Team Training",
    "Tech Stack Integration",
    "Performance Analytics"
];

export function Services() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16 font-heading"
                >
                    Capabilities
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-accent-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="h-12 w-12 rounded-full bg-accent-glow/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                                <div className="h-4 w-4 rounded-full bg-accent-glow shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-900 mb-2 relative z-10">{service}</h3>
                            <p className="text-zinc-900/60 text-sm leading-relaxed relative z-10">
                                Streamlined solutions for modern business operations.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
