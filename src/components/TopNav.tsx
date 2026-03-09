"use client";

import React, { useState } from "react";
import {
    Search,
    Bell,
    User,
    HelpCircle,
    LogOut,
    Menu,
    ChevronDown,
    Zap,
    Command as CommandIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { NotificationsCenter } from "./NotificationsCenter";
import { cn } from "@/lib/utils";

export function TopNav() {
    const { user, logout } = useAuth();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="h-20 border-b border-zinc-800 bg-black/40 backdrop-blur-md px-8 sticky top-0 z-50 flex items-center justify-between">
            {/* Left: Search Trigger */}
            <div className="flex items-center gap-4 flex-1">
                <div
                    onClick={() => {
                        // Dispatch the CMD+K event to trigger the palette
                        window.dispatchEvent(new KeyboardEvent('keydown', {
                            key: 'k',
                            metaKey: true,
                            bubbles: true
                        }));
                    }}
                    className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 px-4 py-2.5 rounded-2xl cursor-pointer transition-all group w-full max-w-sm"
                >
                    <Search size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    <span className="text-sm font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors">Search anything...</span>
                    <div className="ml-auto flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-all">
                        <CommandIcon size={10} className="text-zinc-600" />
                        <span className="text-[10px] font-black text-zinc-600 uppercase">K</span>
                    </div>
                </div>
            </div>

            {/* Right: Tools & Profile */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-zinc-950 border border-zinc-900 p-1.5 rounded-2xl gap-1">
                    <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-600/20 italic">
                        <Zap size={16} />
                    </div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 italic">Pro Plan</span>
                </div>

                <div className="h-8 w-[1px] bg-zinc-800 hidden md:block" />

                <div className="relative">
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={cn(
                            "p-3 rounded-2xl border transition-all relative",
                            isNotificationsOpen
                                ? "bg-white text-black border-white shadow-xl shadow-white/10"
                                : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                        )}
                    >
                        <Bell size={20} />
                        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-zinc-950" />
                    </button>
                    <AnimatePresence>
                        {isNotificationsOpen && (
                            <NotificationsCenter
                                isOpen={isNotificationsOpen}
                                onClose={() => setIsNotificationsOpen(false)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-1.5 pr-4 rounded-full transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-sm border-2 border-zinc-900 overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user?.email?.[0].toUpperCase() || "A"
                            )}
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-black text-white leading-none italic">{user?.displayName || "Admin"}</p>
                            <p className="text-[10px] font-bold text-zinc-500 leading-none mt-1">Owner</p>
                        </div>
                        <ChevronDown size={14} className={cn("text-zinc-600 group-hover:text-zinc-400 transition-all", isProfileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-2 z-[60]"
                            >
                                <div className="p-4 border-b border-zinc-800 mb-2">
                                    <p className="text-xs font-black text-white">{user?.email}</p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1 italic">Enterprise access</p>
                                </div>

                                <button className="w-full flex items-center gap-3 p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all text-sm font-bold">
                                    <User size={18} />
                                    My Profile
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all text-sm font-bold">
                                    <HelpCircle size={18} />
                                    Support Docs
                                </button>

                                <div className="h-[1px] bg-zinc-800 my-2" />

                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all text-sm font-black italic"
                                >
                                    <LogOut size={18} />
                                    Secure Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
