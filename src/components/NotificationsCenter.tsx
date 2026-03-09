"use client";

import React, { useState } from "react";
import {
    Bell,
    CheckCheck,
    Info,
    AlertCircle,
    Package,
    CreditCard,
    MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const notifications = [
    { id: 1, type: "inventory", title: "Low Stock Alert", message: "Paracetamol 500mg is below 50 units.", time: "2m ago", read: false, icon: Package, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 2, type: "payment", title: "Payout Successful", message: "₦250,000 has been sent to your bank.", time: "1h ago", read: false, icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 3, type: "system", title: "System Update", message: "Aider Pro v1.1 is now live with new reports.", time: "5h ago", read: true, icon: Info, color: "text-red-500", bg: "bg-blue-500/10" },
    { id: 4, type: "security", title: "Login Detected", message: "New login from Lagos, Nigeria.", time: "1d ago", read: true, icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
];

export function NotificationsCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[110]" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-[400px] bg-zinc-50 border border-zinc-200 rounded-[32px] shadow-2xl z-[120] overflow-hidden"
            >
                <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-3">
                        <Bell size={20} className="text-zinc-900" />
                        <h3 className="text-sm font-black text-zinc-900 italic tracking-tight">Notifications</h3>
                    </div>
                    <button className="text-[10px] font-black text-zinc-500 hover:text-zinc-900 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                        <CheckCheck size={14} />
                        Mark all as read
                    </button>
                </div>

                <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={cn(
                                "p-6 flex gap-4 hover:bg-zinc-100/40 transition-all cursor-pointer border-b border-zinc-200/50 last:border-none",
                                !notif.read && "bg-red-600/5"
                            )}
                        >
                            <div className={cn("p-3 h-fit rounded-2xl", notif.bg, notif.color)}>
                                <notif.icon size={20} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-zinc-900 tracking-tight">{notif.title}</span>
                                    <span className="text-[10px] font-black text-zinc-600 uppercase italic">{notif.time}</span>
                                </div>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{notif.message}</p>
                            </div>
                            {!notif.read && (
                                <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/40" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white/50 border-t border-zinc-200 text-center">
                    <button className="text-[10px] font-black text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-all">
                        View All Notifications
                    </button>
                </div>
            </motion.div>
        </>
    );
}
