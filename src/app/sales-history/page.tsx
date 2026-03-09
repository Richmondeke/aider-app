"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Download,
    Calendar,
    MoreVertical,
    Eye,
    Trash2,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const sales = [
    { id: "#SAL-900", customer: "Alice Freeman", items: 3, total: "₦12,500.00", payment: "Card", status: "Completed", date: "Today, 12:45 PM" },
    { id: "#SAL-899", customer: "Anonymous", items: 1, total: "₦4,200.00", payment: "Cash", status: "Completed", date: "Today, 10:30 AM" },
    { id: "#SAL-898", customer: "Robert Fox", items: 12, total: "₦145,000.00", payment: "Transfer", status: "Processing", date: "Yesterday, 3:15 PM" },
    { id: "#SAL-897", customer: "Jane Cooper", items: 2, total: "₦8,900.00", payment: "Card", status: "Completed", date: "Yesterday, 11:20 AM" },
    { id: "#SAL-896", customer: "Darlene Robertson", items: 5, total: "₦23,400.00", payment: "Cash", status: "Cancelled", date: "Mar 8, 2026" },
];

export default function SalesHistoryPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Sales History</h1>
                    <p className="text-zinc-500 mt-1">Review and manage all your past sales records.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-semibold">
                        <Download size={18} />
                        Download CSV
                    </button>
                </div>
            </div>

            {/* Stats Summary Tooltips or Mini Cards */}
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none">
                {[
                    { label: "Total Volume", value: "₦2.4M", color: "blue" },
                    { label: "Total Orders", value: "1,240", color: "purple" },
                    { label: "Average Order", value: "₦12,400", color: "emerald" },
                    { label: "Cancelled", value: "12", color: "red" },
                ].map((item) => (
                    <div key={item.label} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 min-w-[200px] flex justify-between items-center group">
                        <span className="text-zinc-500 text-sm font-medium">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                    </div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order ID, customer name or items..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <select className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-8 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                                <option>All Time</option>
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-bold">
                            <Filter size={18} />
                            More Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest border-b border-zinc-800/50">
                                <th className="px-8 py-6">Order ID</th>
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Items</th>
                                <th className="px-8 py-6">Total Amount</th>
                                <th className="px-8 py-6">Payment</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Date</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {sales.map((sale) => (
                                <tr key={sale.id} className="group hover:bg-zinc-800/20 transition-all">
                                    <td className="px-8 py-6 font-bold text-zinc-300">{sale.id}</td>
                                    <td className="px-8 py-6">
                                        <span className="text-zinc-100 font-medium">{sale.customer}</span>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-400 font-medium">{sale.items} items</td>
                                    <td className="px-8 py-6 text-zinc-100 font-bold">{sale.total}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <CreditCard size={14} className="text-zinc-600" />
                                            <span className="text-xs font-medium">{sale.payment}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                            sale.status === "Completed" && "bg-emerald-500/10 text-emerald-500",
                                            sale.status === "Processing" && "bg-blue-500/10 text-blue-500",
                                            sale.status === "Cancelled" && "bg-red-500/10 text-red-500",
                                        )}>
                                            {sale.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500 text-xs font-medium text-right whitespace-nowrap">{sale.date}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="View details">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="Download receipt">
                                                <FileText size={18} />
                                            </button>
                                            <button className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete record">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 border-t border-zinc-800 flex items-center justify-between">
                    <p className="text-zinc-500 text-sm">Showing 1 to 10 of 2,451 records</p>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, "...", 245].map((page, idx) => (
                            <button
                                key={idx}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                                    page === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
