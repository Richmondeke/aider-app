"use client";

import React from "react";
import {
    Receipt,
    Plus,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Building2,
    MoreVertical,
    Calendar,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const expenses = [
    { id: "EXP-902", category: "Rent", merchant: "Mega Towers Ltd", amount: "₦250,000.00", date: "Today", status: "Paid", type: "fixed" },
    { id: "EXP-901", category: "Utilities", merchant: "PHCN / Electric", amount: "₦12,500.00", date: "Today", status: "Unpaid", type: "variable" },
    { id: "EXP-900", category: "Logistics", merchant: "GIG Logistics", amount: "₦8,400.00", date: "Yesterday", status: "Paid", type: "variable" },
    { id: "EXP-899", category: "Marketing", merchant: "Facebook Ads", amount: "₦45,000.00", date: "Mar 7, 2026", status: "Paid", type: "variable" },
];

export default function ExpensesPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Financial Outflow</h1>
                    <p className="text-zinc-500 mt-1">Track business spending, manage utility bills and monthly recurring costs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Receipt size={18} />
                        Bulk Upload
                    </button>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-red-600/20">
                        <Plus size={20} />
                        Log Expense
                    </button>
                </div>
            </div>

            {/* Expense Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total This Month", value: "₦1,240,000.00", sub: "+5.2% vs Last Month", icon: ArrowUpRight, color: "red" },
                    { label: "Pending Bills", value: "₦85,000.00", sub: "3 overdue invoices", icon: AlertCircle, color: "amber" },
                    { label: "Top Category", value: "Inventory", sub: "62% of total spend", icon: Building2, color: "blue" },
                    { label: "Daily Average", value: "₦42,000.00", sub: "Consistent with budget", icon: CreditCard, color: "purple" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px] relative overflow-hidden">
                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className={cn(
                                "w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0",
                                stat.color === "red" && "bg-red-500/10 text-red-500",
                                stat.color === "amber" && "bg-amber-500/10 text-amber-500",
                                stat.color === "blue" && "bg-red-600/10 text-red-500",
                                stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                            )}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-zinc-900 mt-1 break-words">{stat.value}</p>
                                <p className="text-[10px] font-bold text-zinc-600 mt-1 uppercase tracking-tighter">{stat.sub}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main List */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search expenses by category, merchant or ID..."
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 focus:border-red-500 outline-none transition-all"
                        />
                    </div>
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Filter size={18} />
                        Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-zinc-500 text-[11px] font-black uppercase tracking-widest border-b border-zinc-200/50">
                                <th className="px-10 py-6">Reference & Merchant</th>
                                <th className="px-10 py-6">Category</th>
                                <th className="px-10 py-6">Logged Date</th>
                                <th className="px-10 py-6">Total Amount</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {expenses.map((exp) => (
                                <tr key={exp.id} className="group hover:bg-zinc-100/20 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black border",
                                                exp.type === "fixed" ? "bg-purple-600/10 border-purple-500/20 text-purple-500" : "bg-red-600/10 border-blue-500/20 text-red-500"
                                            )}>
                                                {exp.merchant[0]}
                                            </div>
                                            <div>
                                                <span className="text-zinc-900 font-bold block">{exp.merchant}</span>
                                                <span className="text-zinc-600 text-[11px] font-black uppercase tracking-widest">{exp.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                            {exp.category}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-zinc-500 font-bold text-sm">
                                        {exp.date}
                                    </td>
                                    <td className="px-10 py-8 font-black text-zinc-900">{exp.amount}</td>
                                    <td className="px-10 py-8">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            exp.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                        )}>
                                            {exp.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-500 hover:text-zinc-900 transition-all opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
