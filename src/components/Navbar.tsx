"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 glass-nav"
        >
            <Link href="/" className="text-2xl font-bold tracking-tight font-heading">
                AIDER
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/projects" className="text-sm font-medium text-zinc-900/70 hover:text-zinc-900 transition-colors hidden md:block">
                    Projects
                </Link>
                <Link href="/about" className="text-sm font-medium text-zinc-900/70 hover:text-zinc-900 transition-colors hidden md:block">
                    About
                </Link>
                <Button variant="secondary" size="sm" className="ml-4">
                    Book a Call
                </Button>
            </div>
        </motion.nav>
    );
}
