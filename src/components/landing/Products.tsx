"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default function Products() {
    return (
        <section id="products" className="py-24 bg-gray-50 text-black px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Products</h2>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        Purpose-built tools to power your operations systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1000px]">
                    {/* Inventory Management Product Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        whileHover={{
                            scale: 1.02,
                            translateZ: 30,
                            rotateX: 1,
                            rotateY: -1,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                        }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col items-start cursor-default transition-shadow duration-300"
                    >
                        <div className="p-4 bg-blue-50 rounded-2xl mb-8 group-hover:bg-blue-100 transition-colors">
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Inventory Management</h3>
                        <p className="text-gray-600 mb-10 flex-1 text-lg">
                            Take complete control of your stock. Track levels in real-time, automate reordering, and gain insights into your most profitable items across multiple locations.
                        </p>
                        <Link
                            href="/dashboard"
                            className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium border border-transparent shadow-lg shadow-black/10 hover:shadow-black/20"
                        >
                            Access Tool
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Coming Soon Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{
                            scale: 1.01,
                            translateZ: 10,
                            backgroundColor: "rgba(243, 244, 246, 0.8)"
                        }}
                        className="bg-gray-100/50 rounded-3xl p-8 md:p-12 border border-gray-100 border-dashed flex flex-col items-center justify-center text-center inset-0 transition-all duration-300 cursor-default"
                    >
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">More Products</h3>
                        <p className="text-gray-500">Coming soon to the Aider ecosystem.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
