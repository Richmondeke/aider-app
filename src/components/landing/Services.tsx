"use client";

import { motion } from "framer-motion";

const services = [
    "Product Design",
    "Product Sourcing",
    "Inventory Management",
    "Franchise management",
    "SOPs & Checklists",
    "Hiring + Training",
    "QA + Customer Experience",
    "Reporting + dashboards",
    "Rollout Playbook"
];

export default function Services({ isRevealed = false }: { isRevealed?: boolean }) {
    return (
        <section id="services" className={`min-h-screen flex items-center justify-center bg-white text-black px-6 ${isRevealed ? 'py-12' : 'py-24'}`}>
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Business Operations Systems that endure
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
                        Clarity replaces confusion. Accountability becomes embedded in how your teams work. Systems that once held you back now drive you forward.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow bg-gray-50/50"
                        >
                            <h3 className="text-xl font-semibold">{service}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
