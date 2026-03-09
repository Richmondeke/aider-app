"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            // Rough estimate of where the white reveal section becomes dominant
            setIsPastHero(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isPastHero
                ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 text-black"
                : isScrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4 text-white"
                    : "bg-transparent py-6 text-white"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Aider"
                        className={`h-8 w-auto object-contain transition-all duration-300 ${isPastHero ? '' : 'brightness-0 invert'
                            }`}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="#services" className="hover:text-blue-500 transition-colors">Services</Link>
                    <Link href="#products" className="hover:text-blue-500 transition-colors">Products</Link>
                    <a href="https://aidercorp.com/#projects" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">Portfolio</a>
                    <Link href="/auth/login" className={`px-5 py-2.5 rounded-full transition-colors ${isPastHero ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}>
                        Log In
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-black border-b border-white/10 px-6 py-6 absolute top-full left-0 right-0"
                >
                    <nav className={`flex flex-col gap-6 text-lg ${isPastHero ? 'text-black' : 'text-white'}`}>
                        <Link href="#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                        <Link href="#products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                        <a href="https://aidercorp.com/#projects" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className={`inline-block px-6 py-3 text-center rounded-full font-medium ${isPastHero ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Log In
                        </Link>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
