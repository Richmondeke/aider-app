"use client";

import { motion } from "framer-motion";

const team = [
    {
        name: "David Eke",
        role: "CEO & Founder",
        bio: "Visionary leader with a passion for revolutionizing business operations through innovative technology. David leads Aider with a focus on simplicity, power, and user-centric design.",
        image: "/images/team/david-eke.jpg",
    },
];

export default function Team() {
    return (
        <section id="team" className="py-24 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Leadership</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        The minds behind Aider, dedicated to empowering businesses worldwide.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative group flex flex-col md:flex-row items-center gap-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10"
                        >
                            <div className="relative w-64 h-80 md:w-80 md:h-[450px] flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <span className="text-primary font-bold tracking-widest uppercase text-xs">
                                        {member.role}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-bold mt-2 mb-6 tracking-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                                        {member.bio}
                                    </p>

                                    <div className="mt-8 flex justify-center md:justify-start gap-4">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{ duration: 0.8, delay: 0.8 }}
                                            className="h-1 w-16 bg-primary rounded-full origin-left"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
