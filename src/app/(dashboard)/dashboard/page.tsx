"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Filter,
    PieChart,
    Boxes,
    Truck,
    Warehouse,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { getDashboardStats } from "@/lib/firebase/service";
import type { Sale } from "@/lib/firebase/service";

interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    lowStockCount: number;
    recentSales: Sale[];
}

const statusBadge = {
    Completed: "badge-success",
    Processing: "badge-warning",
    Cancelled: "badge-danger",
    Refunded: "badge-neutral",
};

function fmt(amount: number) {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) return;
        getDashboardStats(user.uid)
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user?.uid]);

    const statCards = stats ? [
        { name: "Total Sales", value: fmt(stats.totalSales), change: "Live", trend: "up", icon: DollarSign, color: "red" },
        { name: "Total Orders", value: stats.totalOrders.toString(), change: "Completed", trend: "up", icon: TrendingDown, color: "red" },
        { name: "Total Products", value: stats.totalProducts.toString(), change: "Listed", trend: "up", icon: TrendingUp, color: "emerald" },
        { name: "Low / No Stock", value: stats.lowStockCount.toString(), change: "Need restock", trend: stats.lowStockCount > 0 ? "down" : "up", icon: Users, color: stats.lowStockCount > 0 ? "red" : "emerald" },
    ] : [];

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">
                        {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        {" · "}Real-time overview
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn-ghost text-sm">
                        <Calendar size={15} />
                        This Month
                    </button>
                    <button className="btn-ghost text-sm">
                        <Filter size={15} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="card p-5 h-28 animate-pulse bg-zinc-50" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, idx) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06, duration: 0.3 }}
                            className="card p-5 hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn(
                                    "w-9 h-9 rounded-lg flex items-center justify-center",
                                    stat.color === "red" && "bg-red-50 text-red-500",
                                    stat.color === "emerald" && "bg-emerald-50 text-emerald-500",
                                )}>
                                    <stat.icon size={17} strokeWidth={2} />
                                </div>
                                <span className={cn(
                                    "flex items-center gap-0.5 text-[11px] font-bold",
                                    stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                                )}>
                                    {stat.trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-zinc-400 mb-1">{stat.name}</p>
                            <p className="text-2xl font-bold text-zinc-900 tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-zinc-900">Revenue Overview</h3>
                        <select className="text-xs border border-zinc-200 rounded-lg px-2.5 py-1.5 text-zinc-500 outline-none bg-zinc-50">
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div className="h-56 flex items-center justify-center border border-dashed border-zinc-200 rounded-xl">
                        <div className="text-center">
                            <PieChart size={36} className="text-zinc-300 mx-auto mb-2" strokeWidth={1.5} />
                            <p className="text-xs text-zinc-400">Analytics chart renders here</p>
                            <p className="text-[11px] text-zinc-300 mt-1">Connect a charting library to visualise sales data</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions + Alerts */}
                <div className="space-y-4">
                    <div className="card p-5">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/sell" className="flex flex-col items-center gap-2 p-4 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-all">
                                <ShoppingBag size={20} strokeWidth={1.75} />
                                <span className="text-xs font-semibold">New Sale</span>
                            </Link>
                            <Link href="/inventory/products" className="flex flex-col items-center gap-2 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-all">
                                <Boxes size={20} strokeWidth={1.75} />
                                <span className="text-xs font-semibold">Stock In</span>
                            </Link>
                        </div>
                    </div>

                    <div className="card p-5 space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Alerts</h3>
                        {loading ? (
                            <div className="h-20 animate-pulse bg-zinc-50 rounded-xl" />
                        ) : (
                            <>
                                {(stats?.lowStockCount ?? 0) > 0 && (
                                    <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-red-500 bg-red-50">
                                            <Warehouse size={16} strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-zinc-900">Low Stock Alert</p>
                                            <p className="text-[11px] text-zinc-400">{stats?.lowStockCount} products need restocking</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-amber-500 bg-amber-50">
                                        <Truck size={16} strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-900">Pending Deliveries</p>
                                        <p className="text-[11px] text-zinc-400">Check Purchases for updates</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Sales Table */}
            <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-50 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-900">Recent Sales</h3>
                    <Link href="/sales-history" className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 flex items-center justify-center">
                            <Loader2 size={24} className="text-zinc-300 animate-spin" />
                        </div>
                    ) : stats?.recentSales.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-sm text-zinc-400">No sales yet. <Link href="/sell" className="text-red-600 font-semibold">Make your first sale →</Link></p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-50">
                                    <th className="px-5 py-3">Order ID</th>
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Items</th>
                                    <th className="px-5 py-3">Amount</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentSales.map((sale) => (
                                    <tr key={sale.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                        <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-700">#{sale.id?.slice(-6).toUpperCase()}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                                                    {sale.customerName[0]}
                                                </div>
                                                <span className="text-[13px] font-medium text-zinc-900">{sale.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-[13px] text-zinc-500">{sale.items?.length ?? 0} items</td>
                                        <td className="px-5 py-3.5 text-[13px] font-semibold text-zinc-900">{fmt(sale.totalAmount)}</td>
                                        <td className="px-5 py-3.5">
                                            <span className={cn("badge", statusBadge[sale.status as keyof typeof statusBadge])}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-[11px] text-zinc-400 text-right">
                                            {sale.createdAt?.toDate
                                                ? sale.createdAt.toDate().toLocaleDateString("en-NG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
