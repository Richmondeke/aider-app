"use client";

import React from "react";
import {
    UserPlus,
    Search,
    Filter,
    Star,
    ShoppingBag,
    History,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
    {
        id: "CUS-701",
        name: "Tega Oghenovo",
        email: "tega@gmail.com",
        phone: "0801 234 5678",
        orders: 12,
        spent: "₦420,500.00",
        tier: "VIP",
        status: "Active"
    },
    {
        id: "CUS-702",
        name: "Blessing Amaka",
        email: "blessing.a@outlook.com",
        phone: "0703 445 1122",
        orders: 3,
        spent: "₦85,000.00",
        tier: "Standard",
        status: "Active"
    },
    {
        id: "CUS-703",
        name: "Chukwudi Obi",
        email: "chuks@yahoo.com",
        phone: "0905 667 8899",
        orders: 28,
        spent: "₦1,850,000.00",
        tier: "VVIP",
        status: "Active"
    },
];

export default function CustomersPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Customer Network</h1>
                    <p className="text-zinc-500 mt-1">Nurture relationships, track loyalty and viewing buying patterns.</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-blue-600/20">
                    <UserPlus size={20} />
                    New Customer
                </button>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Customers", value: "842", icon: UserCheck, color: "blue" },
                    { label: "Top Spenders", value: "48", icon: Star, color: "purple" },
                    { label: "Avg. Life Value", value: "₦58,400.00", icon: TrendingUp, color: "emerald" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] flex items-center justify-between">
                        <div className="space-y-2">
                            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                        <div className={cn(
                            "w-16 h-16 rounded-3xl flex items-center justify-center",
                            stat.color === "blue" && "bg-blue-600/10 text-blue-500",
                            stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                            stat.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                        )}>
                            <stat.icon size={32} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by customer name, phone or group..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-bold">
                            <Filter size={18} />
                            Segments
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-zinc-500 text-[11px] font-black uppercase tracking-widest border-b border-zinc-800/50">
                                <th className="px-10 py-6">Customer Profile</th>
                                <th className="px-10 py-6">Tier</th>
                                <th className="px-10 py-6">Orders</th>
                                <th className="px-10 py-6">Total Spent</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {customers.map((cus) => (
                                <tr key={cus.id} className="group hover:bg-zinc-800/20 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-zinc-800 border-2 border-zinc-700/50 flex items-center justify-center text-xl font-black text-zinc-500">
                                                {cus.name[0]}
                                            </div>
                                            <div>
                                                <span className="text-zinc-100 font-bold block">{cus.name}</span>
                                                <span className="text-zinc-600 text-[11px] font-black uppercase tracking-widest">{cus.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            cus.tier === "VVIP" && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                            cus.tier === "VIP" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                                            cus.tier === "Standard" && "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
                                        )}>
                                            {cus.tier}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 font-black text-zinc-300">{cus.orders}</td>
                                    <td className="px-10 py-8">
                                        <span className="text-zinc-100 font-black">{cus.spent}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            <span className="text-xs font-bold text-zinc-400">{cus.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                            <ChevronRight size={20} />
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
