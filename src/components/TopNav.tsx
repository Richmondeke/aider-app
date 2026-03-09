"use client";

import React, { useState } from "react";
import {
    Search,
    Bell,
    User,
    HelpCircle,
    LogOut,
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

    const initials = user?.displayName
        ? user.displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : user?.email?.[0].toUpperCase() || "A";

    return (
        <header className="h-16 border-b border-zinc-100 bg-white px-6 sticky top-0 z-50 flex items-center justify-between">
            {/* Left: Search */}
            <div className="flex items-center flex-1">
                <button
                    onClick={() => {
                        window.dispatchEvent(new KeyboardEvent('keydown', {
                            key: 'k', metaKey: true, bubbles: true
                        }));
                    }}
                    className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 px-3.5 py-2 rounded-lg transition-all group w-72 text-left"
                >
                    <Search size={15} className="text-zinc-400 shrink-0" />
                    <span className="text-sm text-zinc-400 flex-1">Search anything...</span>
                    <div className="flex items-center gap-0.5 bg-white border border-zinc-200 px-1.5 py-0.5 rounded">
                        <CommandIcon size={9} className="text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-400">K</span>
                    </div>
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Plan badge */}
                <div className="hidden md:flex items-center gap-1.5 border border-zinc-200 rounded-lg px-3 py-1.5">
                    <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                        <Zap size={11} className="text-white" fill="white" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Pro Plan</span>
                </div>

                <div className="w-px h-5 bg-zinc-100" />

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={cn(
                            "relative w-9 h-9 flex items-center justify-center rounded-lg border transition-all",
                            isNotificationsOpen
                                ? "bg-zinc-900 border-zinc-900 text-white"
                                : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300"
                        )}
                    >
                        <Bell size={17} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
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

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 border border-zinc-200 hover:border-zinc-300 pl-1 pr-2.5 py-1 rounded-lg transition-all"
                    >
                        <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center text-white font-bold text-[11px] overflow-hidden shrink-0">
                            {user?.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                            ) : initials}
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-semibold text-zinc-900 leading-none">{user?.displayName || "Admin"}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 leading-none">Owner</p>
                        </div>
                        <ChevronDown size={13} className={cn("text-zinc-400 transition-transform", isProfileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                transition={{ duration: 0.12 }}
                                className="absolute right-0 mt-2 w-52 bg-white border border-zinc-100 rounded-xl shadow-lg shadow-zinc-100 p-1.5 z-[60]"
                            >
                                <div className="px-3 py-2.5 border-b border-zinc-100 mb-1">
                                    <p className="text-xs font-semibold text-zinc-900 truncate">{user?.email}</p>
                                    <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-widest">Enterprise Access</p>
                                </div>

                                {[
                                    { icon: User, label: "My Profile" },
                                    { icon: HelpCircle, label: "Support Docs" },
                                ].map(({ icon: Icon, label }) => (
                                    <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-all text-sm font-medium">
                                        <Icon size={15} />
                                        {label}
                                    </button>
                                ))}

                                <div className="h-px bg-zinc-100 my-1" />

                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-semibold"
                                >
                                    <LogOut size={15} />
                                    Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
