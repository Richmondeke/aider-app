"use client";

import React from "react";
import {
    Users,
    Plus,
    Search,
    Filter,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Building2,
    ChevronRight,
    MoreVertical,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const suppliers = [
    {
        id: "SUP-001",
        name: "Acme Electronics Ltd",
        contact: "John Wick",
        email: "john@acme.com",
        phone: "+234 802 334 5567",
        category: "Electronics",
        balance: "₦420,000.00",
        status: "Active"
    },
    {
        id: "SUP-002",
        name: "Focus Computing",
        contact: "Sarah Connor",
        email: "sarah@focus.io",
        phone: "+234 811 009 2233",
        category: "Computers",
        balance: "₦0.00",
        status: "Active"
    },
    {
        id: "SUP-003",
        name: "Lifestyle Brands Co",
        contact: "Tony Stark",
        email: "tony@lifestyle.co",
        phone: "+234 908 776 5544",
        category: "General Goods",
        balance: "₦1,240.00",
        status: "Inactive"
    },
];

export default function SuppliersPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Suppliers Directory</h1>
                    <p className="text-zinc-500 mt-1">Manage your vendors, supply categories and outstanding balances.</p>
                </div>
                <button className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-red-600/20">
                    <Plus size={20} />
                    Add Supplier
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Total Suppliers", value: "24", icon: Building2, color: "blue" },
                    { label: "Active Vendors", value: "18", icon: ExternalLink, color: "emerald" },
                    { label: "Total Payables", value: "₦1,840,000.20", icon: CreditCard, color: "amber" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-50/40 border border-zinc-200 p-6 rounded-[32px] flex items-center gap-5">
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center",
                            stat.color === "blue" && "bg-red-600/10 text-red-500",
                            stat.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                            stat.color === "amber" && "bg-amber-600/10 text-amber-500",
                        )}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-zinc-900 mt-0.5">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[32px] p-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search suppliers by name, email or category..."
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 focus:border-red-500 outline-none transition-all"
                        />
                    </div>
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Filter size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {suppliers.map((sup) => (
                    <div
                        key={sup.id}
                        className="group bg-zinc-50/40 border border-zinc-200 hover:border-zinc-700 rounded-[40px] p-8 flex flex-col gap-8 transition-all relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all" />

                        <div className="flex items-start justify-between relative">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-[24px] bg-zinc-100 border-2 border-zinc-700/50 flex items-center justify-center text-2xl font-black text-zinc-500 uppercase">
                                    {sup.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-zinc-900">{sup.name}</h3>
                                    <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{sup.id}</span>
                                </div>
                            </div>
                            <button className="p-2.5 bg-white/50 border border-zinc-200 rounded-xl text-zinc-500 hover:text-zinc-900 transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-zinc-500" />
                                </div>
                                <span className="text-sm font-medium truncate">{sup.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                                    <Phone size={14} className="text-zinc-500" />
                                </div>
                                <span className="text-sm font-medium">{sup.phone}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Outstanding Balance</span>
                                <span className={cn(
                                    "text-lg font-black",
                                    sup.balance === "₦0.00" ? "text-zinc-500" : "text-amber-500"
                                )}>
                                    {sup.balance}
                                </span>
                            </div>
                            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm transition-all group/btn">
                                Details
                                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
