"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Command,
    Zap,
    Home,
    Package,
    Users,
    Settings,
    Plus,
    ShoppingCart,
    FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const actions = [
        { icon: Home, label: "Go to Dashboard", shortcut: "G D", path: "/dashboard" },
        { icon: ShoppingCart, label: "Make a Sale (POS)", shortcut: "G S", path: "/sell" },
        { icon: Package, label: "Add New Product", shortcut: "C P", path: "/inventory/products" },
        { icon: Users, label: "Manage Customers", shortcut: "G C", path: "/relationships/customers" },
        { icon: FileText, label: "New Quotation", shortcut: "C Q", path: "/quotation" },
        { icon: Settings, label: "App Settings", shortcut: "G ,", path: "/settings" },
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(search.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/60"
                onClick={() => setIsOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    className="w-full max-w-[640px] bg-zinc-900 border border-zinc-800 rounded-[32px] shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
                        <Search className="text-zinc-500" size={24} />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Type a command or search..."
                            className="bg-transparent border-none outline-none w-full text-xl font-bold text-white placeholder:text-zinc-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="flex items-center gap-1 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ESC</span>
                        </div>
                    </div>

                    <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                        <div className="px-4 py-2 border-b border-zinc-800/50 mb-2">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                <Zap size={12} />
                                Quick Actions
                            </span>
                        </div>

                        <div className="space-y-1">
                            {filteredActions.map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        router.push(action.path);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-800/50 group transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all text-zinc-400">
                                            <action.icon size={20} />
                                        </div>
                                        <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{action.label}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {action.shortcut.split(" ").map((key, i) => (
                                            <span key={i} className="text-[10px] font-black text-zinc-600 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                                                {key}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}

                            {filteredActions.length === 0 && (
                                <div className="p-12 text-center">
                                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No results found for "{search}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-zinc-500 italic">
                                <Command size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">K to toggle</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 italic">
                                <Plus size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Global shortcuts</span>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest leading-none">Aider Pro v1.0</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
