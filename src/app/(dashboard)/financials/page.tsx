"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp, TrendingDown, DollarSign, ShoppingCart,
    BarChart3, ArrowUpRight, ArrowDownLeft, Calendar
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { salesService, transactionsService } from "@/lib/firebase/service";
import type { Sale, Transaction } from "@/lib/firebase/service";

const fmt = (n: number) =>
    "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 0 });

function StatSkeleton() {
    return (
        <div className="card p-5 animate-pulse">
            <div className="h-3 bg-zinc-100 rounded w-1/3 mb-3" />
            <div className="h-8 bg-zinc-100 rounded w-2/3 mb-2" />
            <div className="h-2.5 bg-zinc-100 rounded w-1/4" />
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div className="card p-5 animate-pulse">
            <div className="h-4 bg-zinc-100 rounded w-1/3 mb-6" />
            <div className="flex items-end gap-2 h-40">
                {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-100 rounded-t-lg" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

export default function FinancialsPage() {
    const { user } = useAuth();
    const [sales, setSales] = useState<Sale[]>([]);
    const [txns, setTxns] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) return;
        let salesDone = false, txDone = false;
        const markDone = () => { if (salesDone && txDone) setLoading(false); };

        const unsubSales = salesService.subscribe(user.uid, (data) => {
            setSales(data); salesDone = true; markDone();
        });
        const unsubTx = transactionsService.subscribe(user.uid, (data) => {
            setTxns(data); txDone = true; markDone();
        });
        return () => { unsubSales(); unsubTx(); };
    }, [user?.uid]);

    // ─── Derived stats ────────────────────────────────────────────────────────
    const totalRevenue = sales.filter(s => s.status === "Completed").reduce((s, r) => s + r.totalAmount, 0);
    const totalCredit = txns.filter(t => t.type === "Credit").reduce((s, t) => s + t.amount, 0);
    const totalDebit = txns.filter(t => t.type === "Debit").reduce((s, t) => s + t.amount, 0);
    const avgOrderValue = sales.length ? totalRevenue / sales.length : 0;

    // Monthly breakdown (last 6 months from sales)
    const monthlyData: Record<string, number> = {};
    sales.forEach(s => {
        const d = s.createdAt?.toDate ? s.createdAt.toDate() : new Date();
        const key = d.toLocaleDateString("en-NG", { month: "short" });
        monthlyData[key] = (monthlyData[key] || 0) + s.totalAmount;
    });
    const months = Object.entries(monthlyData).slice(-6);
    const maxMonthly = Math.max(...months.map(([, v]) => v), 1);

    // Payment method breakdown
    const payMethodCount: Record<string, number> = {};
    sales.forEach(s => {
        payMethodCount[s.paymentMethod] = (payMethodCount[s.paymentMethod] || 0) + 1;
    });

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Financials</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Revenue overview and financial insights</p>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-500">
                    <Calendar size={13} /> All time
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {loading ? (
                    [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
                ) : [
                    { label: "Total Revenue", value: fmt(totalRevenue), change: `${sales.length} orders`, icon: DollarSign, up: true },
                    { label: "Credits Received", value: fmt(totalCredit), change: `${txns.filter(t => t.type === "Credit").length} transactions`, icon: ArrowDownLeft, up: true },
                    { label: "Debits / Spent", value: fmt(totalDebit), change: `${txns.filter(t => t.type === "Debit").length} transactions`, icon: ArrowUpRight, up: false },
                    { label: "Avg Order Value", value: fmt(Math.round(avgOrderValue)), change: `From ${sales.length} sales`, icon: BarChart3, up: true },
                ].map(s => (
                    <div key={s.label} className="card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-medium text-zinc-400">{s.label}</p>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.up ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                                <s.icon size={15} />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-zinc-900">{s.value}</p>
                        <p className="text-[11px] text-zinc-400 mt-1">{s.change}</p>
                    </div>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Monthly Revenue Bar Chart */}
                <div className="lg:col-span-2 card p-5">
                    <h3 className="text-sm font-bold text-zinc-900 mb-5">Monthly Revenue</h3>
                    {loading ? (
                        <div className="flex items-end gap-2 h-40">
                            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                                <div key={i} className="flex-1 bg-zinc-100 rounded-t-lg animate-pulse" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    ) : months.length === 0 ? (
                        <div className="h-40 flex flex-col items-center justify-center text-center">
                            <BarChart3 size={28} className="text-zinc-200 mb-2" />
                            <p className="text-sm text-zinc-400">No revenue data yet.</p>
                            <p className="text-xs text-zinc-300 mt-1">Complete sales to see data here.</p>
                        </div>
                    ) : (
                        <div className="flex items-end gap-2 h-40">
                            {months.map(([month, val]) => (
                                <motion.div
                                    key={month}
                                    className="flex-1 flex flex-col items-center gap-2"
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: 1 }}
                                    style={{ transformOrigin: "bottom" }}
                                >
                                    <div
                                        className="w-full bg-red-600 rounded-t-lg"
                                        style={{ height: `${(val / maxMonthly) * 100}%`, minHeight: 4 }}
                                    />
                                    <span className="text-[10px] text-zinc-400 font-medium">{month}</span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="card p-5">
                    <h3 className="text-sm font-bold text-zinc-900 mb-5">Payment Methods</h3>
                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse flex items-center gap-3">
                                    <div className="h-3 bg-zinc-100 rounded w-1/4" />
                                    <div className="flex-1 h-2.5 bg-zinc-100 rounded-full" />
                                    <div className="h-3 bg-zinc-100 rounded w-8" />
                                </div>
                            ))}
                        </div>
                    ) : Object.keys(payMethodCount).length === 0 ? (
                        <div className="h-32 flex flex-col items-center justify-center text-center">
                            <ShoppingCart size={24} className="text-zinc-200 mb-2" />
                            <p className="text-xs text-zinc-400">No sales data yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(payMethodCount).sort((a, b) => b[1] - a[1]).map(([method, count]) => {
                                const total_ = Object.values(payMethodCount).reduce((s, v) => s + v, 0);
                                const pct = Math.round((count / total_) * 100);
                                return (
                                    <div key={method}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-zinc-700">{method}</span>
                                            <span className="text-[11px] text-zinc-400">{pct}%</span>
                                        </div>
                                        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                className="h-full bg-red-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Sales Table */}
            <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900">Recent Sales</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-50">
                                {["Customer", "Items", "Amount", "Method", "Status", "Date"].map(h => (
                                    <th key={h} className="px-5 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse border-b border-zinc-50">
                                        {[...Array(6)].map((_, j) => (
                                            <td key={j} className="px-5 py-4"><div className="h-3.5 bg-zinc-100 rounded w-3/4" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : sales.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-16 text-center">
                                        <TrendingUp size={32} className="text-zinc-200 mx-auto mb-3" />
                                        <p className="text-sm text-zinc-400">No sales recorded yet.</p>
                                        <p className="text-xs text-zinc-300 mt-1">Complete a sale to see it here.</p>
                                    </td>
                                </tr>
                            ) : sales.slice(0, 10).map(sale => (
                                <tr key={sale.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                    <td className="px-5 py-3.5 text-[13px] font-semibold text-zinc-900">{sale.customerName}</td>
                                    <td className="px-5 py-3.5 text-[13px] text-zinc-500">{sale.items?.length ?? 0}</td>
                                    <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-900">{fmt(sale.totalAmount)}</td>
                                    <td className="px-5 py-3.5"><span className="badge badge-neutral">{sale.paymentMethod}</span></td>
                                    <td className="px-5 py-3.5"><span className="badge badge-success">{sale.status}</span></td>
                                    <td className="px-5 py-3.5 text-[11px] text-zinc-400">
                                        {sale.createdAt?.toDate
                                            ? sale.createdAt.toDate().toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                                            : "—"}
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
