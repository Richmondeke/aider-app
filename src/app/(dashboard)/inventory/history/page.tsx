"use client";

import React from "react";
import {
    ArrowLeft,
    History,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Package,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
    { id: "LOG-102", product: "Premium Wireless Headset", action: "Stock In", quantity: "+24", user: "John Doe", date: "Today, 11:20 AM", type: "in" },
    { id: "LOG-101", product: "Leather Carry Bag", action: "Sale", quantity: "-2", user: "POS Kiosk 1", date: "Today, 10:45 AM", type: "out" },
    { id: "LOG-100", product: "Smart Water Bottle", action: "Adjustment", quantity: "-1", user: "Admin", date: "Yesterday, 4:15 PM", type: "adj" },
    { id: "LOG-099", product: "Ergonomic Mechanical Keyboard", action: "Stock In", quantity: "+5", user: "Sarah J.", date: "Mar 7, 2026", type: "in" },
];

export default function ProductHistoryPage() {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-2xl text-zinc-500">
                        <History size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Stock History</h1>
                        <p className="text-zinc-500 mt-1">Audit log for all product movements and stock adjustments.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-100 transition-all font-semibold">
                        <Calendar size={18} />
                        Specific Date
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[32px] p-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by log ID, product or user..."
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 focus:border-red-500 outline-none transition-all"
                        />
                    </div>
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Filter size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Log Feed */}
            <div className="space-y-4">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="group bg-zinc-50/40 border border-zinc-200 hover:border-zinc-700 p-6 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className={cn(
                                "w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0",
                                log.type === "in" && "bg-emerald-500/10 text-emerald-500",
                                log.type === "out" && "bg-blue-500/10 text-red-500",
                                log.type === "adj" && "bg-amber-500/10 text-amber-500",
                            )}>
                                {log.type === "in" && <ArrowDownRight size={28} />}
                                {log.type === "out" && <ArrowUpRight size={28} />}
                                {log.type === "adj" && <Package size={28} />}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{log.id}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span className="text-zinc-500 text-xs font-bold">{log.action}</span>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mt-0.5">{log.product}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-12 text-right">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Quantity</span>
                                <span className={cn(
                                    "text-xl font-black",
                                    log.type === "in" ? "text-emerald-500" : log.type === "out" ? "text-red-500" : "text-amber-500"
                                )}>
                                    {log.quantity}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-[120px]">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Performed By</span>
                                <span className="text-sm font-bold text-zinc-200">{log.user}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Timestamp</span>
                                <span className="text-sm font-bold text-zinc-500">{log.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="py-10 text-center">
                <button className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-red-600/5 hover:bg-red-600/10 transition-all">
                    Load more logs
                    <History size={16} />
                </button>
            </div>
        </div>
    );
}
