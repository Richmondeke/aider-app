"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Download,
    Calendar,
    Eye,
    Trash2,
    FileText,
    CreditCard,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { salesService } from "@/lib/firebase/service";
import type { Sale } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

const statusBadge = {
    Completed: "badge-success",
    Processing: "badge-warning",
    Cancelled: "badge-danger",
    Refunded: "badge-neutral",
};

function fmt(amount: number) {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
}

export default function SalesHistoryPage() {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const { data: sales, loading } = useFirestoreCollection<Sale>("sales", [orderBy("createdAt", "desc")]);

    const filtered = sales.filter(s =>
        s.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        s.id?.toLowerCase().includes(search.toLowerCase())
    );

    const totalVolume = sales.filter(s => s.status === "Completed").reduce((sum, s) => sum + (s.totalAmount || 0), 0);
    const totalOrders = sales.length;
    const avgOrder = totalOrders > 0 ? totalVolume / totalOrders : 0;
    const cancelled = sales.filter(s => s.status === "Cancelled").length;

    async function handleDelete(id: string) {
        if (!user?.uid || !confirm("Delete this sale record?")) return;
        await salesService.remove(user.uid, id);
    }

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Sales History</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Review and manage all your past sales records</p>
                </div>
                <button className="btn-ghost text-sm">
                    <Download size={15} />
                    Export CSV
                </button>
            </div>

            {/* Mini Stats */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
                {[
                    { label: "Total Volume", value: fmt(totalVolume) },
                    { label: "Total Orders", value: totalOrders.toLocaleString() },
                    { label: "Average Order", value: fmt(avgOrder) },
                    { label: "Cancelled", value: cancelled.toString() },
                ].map((item) => (
                    <div key={item.label} className="card-surface px-4 py-3 min-w-[160px] flex items-center justify-between gap-4 shrink-0">
                        <span className="text-[11px] font-medium text-zinc-400">{item.label}</span>
                        <span className="text-sm font-bold text-zinc-900">{item.value}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="card p-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by order ID or customer name..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                            <select className="bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-9 pr-4 text-sm text-zinc-700 outline-none appearance-none cursor-pointer">
                                <option>All Time</option>
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <button className="btn-ghost text-sm h-[42px]">
                            <Filter size={14} />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                {loading ? (
                    <div className="p-16 flex items-center justify-center">
                        <Loader2 size={28} className="text-zinc-300 animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-50">
                                    <th className="px-5 py-3">Order ID</th>
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Items</th>
                                    <th className="px-5 py-3">Total</th>
                                    <th className="px-5 py-3">Payment</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Date</th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-16 text-center text-sm text-zinc-400">
                                            {search ? "No sales match your search." : "No sales recorded yet."}
                                        </td>
                                    </tr>
                                ) : filtered.map((sale) => (
                                    <tr key={sale.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                        <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-700">
                                            #{sale.id?.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-5 py-3.5 text-[13px] font-medium text-zinc-900">{sale.customerName}</td>
                                        <td className="px-5 py-3.5 text-[13px] text-zinc-500">{sale.items?.length ?? 0} items</td>
                                        <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-900">{fmt(sale.totalAmount)}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1.5 text-zinc-500">
                                                <CreditCard size={13} />
                                                <span className="text-xs font-medium">{sale.paymentMethod}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={cn("badge", statusBadge[sale.status as keyof typeof statusBadge])}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-[11px] text-zinc-400 text-right whitespace-nowrap">
                                            {sale.createdAt?.toDate
                                                ? sale.createdAt.toDate().toLocaleDateString("en-NG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all" title="View">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all" title="Receipt">
                                                    <FileText size={14} />
                                                </button>
                                                <button
                                                    onClick={() => sale.id && handleDelete(sale.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="px-5 py-3 border-t border-zinc-50 flex items-center justify-between">
                    <p className="text-[11px] text-zinc-400">Showing {filtered.length} of {sales.length} records</p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all",
                                    page === 1 ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100"
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
