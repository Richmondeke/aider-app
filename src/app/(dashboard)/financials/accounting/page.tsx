"use client";

import React from "react";
import {
    BookOpen,
    TrendingUp,
    FileSpreadsheet,
    Download,
    Search,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Calculator,
    MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const ledgeEntries = [
    { id: "L-9901", date: "Oct 12, 2023", description: "Batch Purchase: Amoxil 500", type: "Debit", amount: 450000, category: "Inventory" },
    { id: "L-9902", date: "Oct 12, 2023", description: "Daily POS Sales Settlement", type: "Credit", amount: 820500, category: "Sales" },
    { id: "L-9903", date: "Oct 13, 2023", description: "Office Electricity Bill", type: "Debit", amount: 12500, category: "Utilities" },
    { id: "L-9904", date: "Oct 14, 2023", description: "Staff Payroll - October", type: "Debit", amount: 1250000, category: "Salaries" },
    { id: "L-9905", date: "Oct 15, 2023", description: "Supplier Refund (Damaged Goods)", type: "Credit", amount: 28000, category: "Refunds" },
];

export default function AccountingPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Accounting & Ledger</h1>
                    <p className="text-zinc-500 font-medium">Double-entry bookkeeping and financial reconciliation.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-red-600/20 flex items-center gap-2">
                        <PlusIcon size={18} />
                        New Entry
                    </button>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Equity", value: "₦12.8M", trend: "+4.2%", icon: BookOpen, color: "text-red-500", bg: "bg-red-600/10" },
                    { label: "Total Assets", value: "₦24.5M", trend: "+1.8%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-600/10" },
                    { label: "Liabilities", value: "₦4.2M", trend: "-0.5%", icon: Calculator, color: "text-amber-500", bg: "bg-amber-600/10" },
                    { label: "Cash on Hand", value: "₦8.9M", trend: "+12%", icon: DollarSign, color: "text-green-500", bg: "bg-green-600/10" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-zinc-50/40 border border-zinc-200 p-6 rounded-[32px] space-y-4">
                        <div className="flex items-center justify-between">
                            <div className={cn(stat.bg, stat.color, "p-3 rounded-2xl")}>
                                <stat.icon size={22} />
                            </div>
                            <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{stat.trend}</span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-zinc-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* General Ledger Table */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/5 p-2 rounded-lg">
                            <FileSpreadsheet size={20} className="text-zinc-500" />
                        </div>
                        <h3 className="text-lg font-black text-zinc-900">General Ledger</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="text"
                                placeholder="Filter entries..."
                                className="bg-white border border-zinc-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-zinc-700 outline-none w-64"
                            />
                        </div>
                        <button className="p-2.5 hover:bg-zinc-100 rounded-xl border border-zinc-200 text-zinc-500">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/50 border-b border-zinc-200">
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Date & Ref</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Description</th>
                                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                                <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Credit (In)</th>
                                <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Debit (Out)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {ledgeEntries.map((entry) => (
                                <tr key={entry.id} className="hover:bg-zinc-100/30 transition-all group">
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-zinc-900 font-bold text-sm tracking-tight">{entry.date}</span>
                                            <span className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">{entry.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="max-w-[300px]">
                                            <span className="text-zinc-700 font-medium text-sm">{entry.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className="bg-white border border-zinc-200 px-3 py-1 rounded-full text-xs font-bold text-zinc-500">
                                            {entry.category}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        {entry.type === "Credit" ? (
                                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                                <span className="font-black text-sm tracking-tight">₦{entry.amount.toLocaleString()}</span>
                                                <ArrowDownLeft size={14} />
                                            </div>
                                        ) : (
                                            <span className="text-zinc-700 font-bold text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        {entry.type === "Debit" ? (
                                            <div className="flex items-center justify-end gap-2 text-red-500">
                                                <span className="font-black text-sm tracking-tight">₦{entry.amount.toLocaleString()}</span>
                                                <ArrowUpRight size={14} />
                                            </div>
                                        ) : (
                                            <span className="text-zinc-700 font-bold text-sm">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-10 border-t border-zinc-200 bg-white/20 text-center">
                    <p className="text-zinc-500 text-sm font-medium">End of ledger for current financial period.</p>
                </div>
            </div>
        </div>
    );
}

const PlusIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
