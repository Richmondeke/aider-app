"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Calendar,
    Filter,
    PieChart,
    Boxes,
    Truck,
    Warehouse
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    {
        name: "Total Sales",
        value: "$128,430",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "blue"
    },
    {
        name: "Total Expenses",
        value: "$43,210",
        change: "-2.4%",
        trend: "down",
        icon: TrendingDown,
        color: "red"
    },
    {
        name: "Net Profit",
        value: "$85,220",
        change: "+18.2%",
        trend: "up",
        icon: TrendingUp,
        color: "emerald"
    },
    {
        name: "Active Customers",
        value: "1,240",
        change: "+5.1%",
        trend: "up",
        icon: Users,
        color: "purple"
    }
];

const recentOrders = [
    { id: "#7842", customer: "John Smith", amount: "$450.00", status: "Paid", date: "2 mins ago" },
    { id: "#7841", customer: "Sarah Johnson", amount: "$1,200.00", status: "Pending", date: "15 mins ago" },
    { id: "#7840", customer: "Michael Brown", amount: "$89.90", status: "Paid", date: "1 hour ago" },
    { id: "#7839", customer: "Emily Davis", amount: "$230.15", status: "Overdue", date: "3 hours ago" },
    { id: "#7838", customer: "David Wilson", amount: "$560.00", status: "Paid", date: "5 hours ago" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-zinc-500 mt-1">Monitor your business performance in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-all text-sm font-medium">
                        <Calendar size={18} />
                        This Month
                    </button>
                    <button className="bg-blue-600 border border-blue-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500 transition-all text-sm font-bold shadow-lg shadow-blue-600/20">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-all"
                    >
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                stat.color === "blue" && "bg-blue-600/10 text-blue-500",
                                stat.color === "red" && "bg-red-600/10 text-red-500",
                                stat.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                                stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                            )}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <span className="text-sm font-medium text-zinc-500">{stat.name}</span>
                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                    <span className={cn(
                                        "text-xs font-bold flex items-center",
                                        stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                                    )}>
                                        {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Background Glow */}
                        <div className={cn(
                            "absolute -bottom-10 -right-10 w-24 h-24 blur-[60px] opacity-20 pointer-events-none rounded-full",
                            stat.color === "blue" && "bg-blue-600",
                            stat.color === "red" && "bg-red-600",
                            stat.color === "emerald" && "bg-emerald-600",
                            stat.color === "purple" && "bg-purple-600",
                        )} />
                    </motion.div>
                ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Summary / Analytics Chart Placeholder */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Payment Summary</h3>
                        <button className="text-zinc-500 hover:text-white transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center border border-zinc-800/50 rounded-2xl border-dashed">
                        <div className="text-center">
                            <PieChart size={48} className="text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-600">Analytics visualization placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Action Center / Quick Tasks */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center gap-3 p-6 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-400 font-semibold hover:bg-blue-600/20 transition-all">
                            <ShoppingBag size={24} />
                            <span className="text-sm">New Sale</span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 text-zinc-400 font-semibold hover:bg-zinc-800 transition-all">
                            <Boxes size={24} />
                            <span className="text-sm">Stock In</span>
                        </button>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                                <Truck size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-zinc-100 truncate">Delivery #451 pending</p>
                                <p className="text-xs text-zinc-500">Expect stock arrival at 4 PM</p>
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                                <Warehouse size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-zinc-100 truncate">Low Stock Alert</p>
                                <p className="text-xs text-zinc-500">5 items reaching limit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-zinc-800">
                    <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                    <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-all">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-zinc-500 text-sm font-medium border-b border-zinc-800/50 uppercase tracking-wider">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-zinc-800/30 transition-all">
                                    <td className="px-8 py-5 font-bold text-zinc-300">{order.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                                {order.customer[0]}
                                            </div>
                                            <span className="text-zinc-100 font-medium">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-zinc-100 font-semibold">{order.amount}</td>
                                    <td className="px-8 py-5">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                            order.status === "Paid" && "bg-emerald-500/10 text-emerald-500",
                                            order.status === "Pending" && "bg-yellow-500/10 text-yellow-500",
                                            order.status === "Overdue" && "bg-red-500/10 text-red-500",
                                        )}>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                order.status === "Paid" && "bg-emerald-500",
                                                order.status === "Pending" && "bg-yellow-500",
                                                order.status === "Overdue" && "bg-red-500",
                                            )} />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-zinc-500 text-sm text-right">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
