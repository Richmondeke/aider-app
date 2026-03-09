"use client";

import React from "react";
import {
    BarChart4,
    Search,
    Filter,
    Download,
    FileSpreadsheet,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    LayoutDashboard,
    Wallet,
    BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
    { id: "REP-001", name: "Profit & Loss Statement", type: "Financial", range: "Last 30 Days", status: "Ready", icon: BarChart4, color: "blue" },
    { id: "REP-002", name: "Inventory Valuation", type: "Stock", range: "Current", status: "Ready", icon: PieChart, color: "purple" },
    { id: "REP-003", name: "Sales Tax Summary", type: "Compliance", range: "Q1 2026", status: "Ready", icon: FileSpreadsheet, color: "emerald" },
    { id: "REP-004", name: "Employee Performance", type: "Management", range: "Monthly", status: "Ready", icon: TrendingUp, color: "amber" },
];

export default function ReportsPage() {
    return (
        <div className="space-y-8 max-w-[1700px] mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-4 rounded-3xl text-blue-500">
                        <LayoutDashboard size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Intelligence & Reports</h1>
                        <p className="text-zinc-500 mt-1">Gaining deep visibility into your business performance and compliance.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-bold">
                        <BookOpen size={20} />
                        Chart of Accounts
                    </button>
                </div>
            </div>

            {/* High-Level P&L Quick Look */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#09090b] border border-zinc-800 p-10 rounded-[48px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-blue-500">
                        <BarChart4 size={280} />
                    </div>
                    <div className="flex items-start justify-between relative z-10">
                        <div className="space-y-6">
                            <span className="bg-blue-600/10 text-blue-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                P&L Statement • LIVE
                            </span>
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-sm font-bold">Net Profit this Month</p>
                                <p className="text-6xl font-black text-white tracking-tighter">₦14,842,500.00</p>
                            </div>
                            <div className="flex items-center gap-8">
                                <div>
                                    <div className="flex items-center gap-2 text-emerald-500 font-black">
                                        <ArrowDownRight size={18} />
                                        <span>+24.8%</span>
                                    </div>
                                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-1">Growth vs Prev</p>
                                </div>
                                <div className="h-10 w-px bg-zinc-800" />
                                <div className="space-y-1">
                                    <p className="text-white font-black text-lg">₦4.2M</p>
                                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Total GPM</p>
                                </div>
                            </div>
                        </div>
                        <button className="bg-white text-black px-6 py-4 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-3">
                            Generate Link
                            <TrendingUp size={18} />
                        </button>
                    </div>
                </div>

                <div className="bg-[#09090b] border border-zinc-800 p-10 rounded-[48px] flex flex-col justify-between gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                                <Wallet size={28} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Current Liquidity</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-white tracking-tight">₦24.8M</h2>
                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full w-[70%] bg-blue-600 rounded-full" />
                            </div>
                            <p className="text-zinc-500 text-xs font-bold leading-relaxed">You have 70% available capital from your quarterly projection.</p>
                        </div>
                    </div>
                    <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:text-white hover:bg-zinc-800 transition-all">
                        Manage All Wallets
                    </button>
                </div>
            </div>

            {/* Reports Directory */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[48px] overflow-hidden">
                <div className="p-10 border-b border-zinc-800 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white">Full Report Library</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Find a specific report..."
                                className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3 pl-12 pr-6 text-xs text-white focus:border-blue-500 outline-none w-64"
                            />
                        </div>
                        <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/50">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-[#09090b] p-10 flex items-center justify-between group hover:bg-zinc-900/50 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-16 h-16 rounded-[24px] flex items-center justify-center",
                                    report.color === "blue" && "bg-blue-600/10 text-blue-500",
                                    report.color === "purple" && "bg-purple-600/10 text-purple-500",
                                    report.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                                    report.color === "amber" && "bg-amber-600/10 text-amber-500",
                                )}>
                                    <report.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white leading-tight group-hover:text-blue-500 transition-colors">{report.name}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                        <span>{report.type}</span>
                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span>{report.range}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
