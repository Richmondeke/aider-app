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

                <div className="space-y-12 md:space-y-24 [perspective:1000px]">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            whileHover={{
                                x: 10,
                                scale: 1.01,
                                translateZ: 20,
                                backgroundColor: "rgba(255, 255, 255, 0.02)"
                            }}
                            className="flex flex-col md:flex-row border-t border-gray-800 pt-12 md:pt-24 gap-8 md:gap-24 transition-all duration-300 rounded-xl px-4 -mx-4 cursor-default"
                        >
                            <div className="text-blue-500 font-mono text-xl">{step.number}</div>
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-5xl font-semibold mb-6 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                                <p className="text-xl text-gray-400 max-w-2xl">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
