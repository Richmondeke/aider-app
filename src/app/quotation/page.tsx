"use client";

import React from "react";
import {
    FileText,
    Plus,
    Search,
    Filter,
    Download,
    Send,
    CheckCircle2,
    Clock,
    XCircle,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";

const quotations = [
    { id: "QT-2041", client: "Federal Ministry of Health", total: "₦4,850,000.00", items: 14, status: "Sent", date: "Today, 10:30 AM" },
    { id: "QT-2040", client: "Lagos State University", total: "₦1,240,000.00", items: 5, status: "Accepted", date: "Yesterday" },
    { id: "QT-2039", client: "Dangiwa Construction", total: "₦85,000.00", items: 2, status: "Draft", date: "Mar 7, 2026" },
    { id: "QT-2038", client: "Unity Bank PLC", total: "₦12,400,000.00", items: 120, status: "Expired", date: "Feb 24, 2026" },
];

export default function QuotationPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Quotations & Proformas</h1>
                    <p className="text-zinc-500 mt-1">Generate professional quotes, track approvals and convert to sales.</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-blue-600/20">
                    <Plus size={20} />
                    Create Quote
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Quotes", value: "12", icon: FileText, color: "blue" },
                    { label: "Accepted (Month)", value: "₦8.4M", icon: CheckCircle2, color: "emerald" },
                    { label: "Pending Approval", value: "5", icon: Clock, color: "amber" },
                    { label: "Conversions", value: "68%", icon: TrendingUp, color: "purple" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[32px] flex items-center gap-5">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                            stat.color === "blue" && "bg-blue-600/10 text-blue-500",
                            stat.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                            stat.color === "amber" && "bg-amber-600/10 text-amber-500",
                            stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                        )}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                            <p className="text-xl font-black text-white mt-0.5">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main List Container */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by quote ID, customer or item..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-bold">
                            <Filter size={18} />
                            Status
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-zinc-800/50">
                    {quotations.map((qt) => (
                        <div
                            key={qt.id}
                            className="group p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-zinc-800/10 transition-all"
                        >
                            <div className="flex items-center gap-6 min-w-0 flex-1">
                                <div className={cn(
                                    "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border",
                                    qt.status === "Accepted" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
                                    qt.status === "Sent" && "bg-blue-500/10 border-blue-500/20 text-blue-500",
                                    qt.status === "Draft" && "bg-zinc-800 border-zinc-700/50 text-zinc-500",
                                    qt.status === "Expired" && "bg-red-500/10 border-red-500/20 text-red-500",
                                )}>
                                    {qt.status === "Accepted" && <CheckCircle2 size={32} />}
                                    {qt.status === "Sent" && <Send size={32} />}
                                    {qt.status === "Draft" && <FileSearch size={32} />}
                                    {qt.status === "Expired" && <XCircle size={32} />}
                                </div>
                                <div className="min-w-0 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{qt.id}</span>
                                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                        <span className="text-zinc-500 text-xs font-bold">{qt.date}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white truncate">{qt.client}</h3>
                                    <p className="text-zinc-500 text-sm font-medium">{qt.items} items listed in this quote</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 text-right">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Total Amount</span>
                                    <span className="text-2xl font-black text-white">
                                        {qt.total}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[140px]">
                                    <span className={cn(
                                        "inline-flex items-center justify-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-center",
                                        qt.status === "Accepted" && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                                        qt.status === "Sent" && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                                        qt.status === "Draft" && "bg-zinc-700 text-zinc-400 border border-zinc-600",
                                        qt.status === "Expired" && "bg-red-500/10 text-red-500 border border-red-500/20",
                                    )}>
                                        {qt.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                        <Download size={20} />
                                    </button>
                                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
