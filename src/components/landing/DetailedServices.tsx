"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Shirt, Briefcase, Coffee, ArrowRight } from "lucide-react";

const serviceCategories = [
    {
        title: "Consumer & Retail",
        description: "Crafting unique, memorable brand identities that resonate with your audience — from logos to visual systems — ensuring every touchpoint reflects your brand's essence.",
        icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
        title: "Fashion & Creative",
        description: "Designing sleek, impactful packaging that not only looks stunning but also connects with your ideal customers — turning first impressions into lasting brand loyalty.",
        icon: <Shirt className="w-6 h-6" />,
    },
    {
        title: "Asset Managers",
        description: "Bringing your brand to life through high-fidelity product mockups, giving you a clear, realistic preview of how your packaging and visuals will stand out in the real world.",
        icon: <Briefcase className="w-6 h-6" />,
    },
    {
        title: "Hospitality & Lifestyle",
        description: "Tailored design mockups that align perfectly with your brand's aesthetic — because every detail matters when showcasing your product's true potential.",
        icon: <Coffee className="w-6 h-6" />,
    },
];

const expertiseTags = [
    "SOPS & Checklists", "Brand Archetyping", "Store/Kiosk Launch", "Copywriting",
    "Customer Experience", "Brand Migration", "Reporting + Dashboards", "Launch Day",
    "Supply Chain", "Inventory System", "QA", "Rollout Playbook"
];

const topTags = [
    "Product Design", "Product Sourcing", "Inventory Management",
    "Franchise management", "Rollout playbook", "Employee Management", "Reporting + dashboards"
];

export default function DetailedServices() {
    return (
        <section id="detailed-services" className="bg-black text-white py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-xs text-gray-400 mb-8">
                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                        Design services
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-6">Services</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mb-12">
                        We embed ourselves in your operations until the work is done.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-16">
                        {topTags.map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-sm text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 mb-20">
                        <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Book a Free Call
                        </button>
                        <button className="px-6 py-3 border border-gray-700 bg-gray-900/50 rounded-full font-medium hover:bg-gray-800 transition-colors">
                            See Projects
                        </button>
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 [perspective:1000px]">
                    {serviceCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: idx * 0.1,
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.02,
                                translateZ: 20,
                                rotateX: 2,
                                rotateY: -1,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.05)"
                            }}
                            className="group p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:border-blue-900/50 transition-colors duration-300 cursor-default"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-gray-800 text-gray-400 group-hover:text-blue-400 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{category.title}</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                {category.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Expertise Tag Cloud - Opposite Scroll Marquee */}
                <div className="relative pt-12 border-t border-gray-900 overflow-hidden flex flex-col gap-4">
                    {/* Row 1: Left Scroll */}
                    <div className="flex overflow-hidden whitespace-nowrap">
                        <motion.div
                            className="flex gap-4 pr-4"
                            animate={{ x: [0, -1000] }}
                            transition={{
                                x: { repeat: Infinity, duration: 40, ease: "linear" }
                            }}
                        >
                            {[...expertiseTags, ...expertiseTags, ...expertiseTags].map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-500 px-6 py-2 rounded-full border border-gray-900/50 bg-gray-900/20 whitespace-nowrap">
                                    {tag}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Right Scroll */}
                    <div className="flex overflow-hidden whitespace-nowrap">
                        <motion.div
                            className="flex gap-4 pr-4"
                            animate={{ x: [-1000, 0] }}
                            transition={{
                                x: { repeat: Infinity, duration: 45, ease: "linear" }
                            }}
                        >
                            {[...expertiseTags, ...expertiseTags, ...expertiseTags].map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-500 px-6 py-2 rounded-full border border-gray-900/50 bg-gray-900/20 whitespace-nowrap">
                                    {tag}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
