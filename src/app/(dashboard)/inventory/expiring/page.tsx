"use client";

import React, { useState } from "react";
import {
    AlertTriangle,
    Calendar,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    ArrowUpRight,
    Clock,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const expiringProducts = [
    { id: "P-101", name: "Paracetamol 500mg", batch: "B-2023-A", expiryDate: "2024-04-15", stock: 120, status: "Critical", risk: "High" },
    { id: "P-105", name: "Amoxicillin Caps", batch: "B-2023-X", expiryDate: "2024-05-20", stock: 45, status: "Warning", risk: "Medium" },
    { id: "P-202", name: "Vitamin C Syrup", batch: "C-99", expiryDate: "2024-06-10", stock: 300, status: "Warning", risk: "Medium" },
    { id: "P-304", name: "Omeprazole", batch: "OM-44", expiryDate: "2024-08-01", stock: 85, status: "Good", risk: "Low" },
    { id: "P-098", name: "Ibuprofen 400mg", batch: "IB-12", expiryDate: "2024-04-10", stock: 12, status: "Critical", risk: "High" },
];

export default function ExpiringProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Expiring Products</h1>
                    <p className="text-zinc-500 font-medium">Monitor and manage items reaching their shelf life.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-50 text-zinc-700 px-5 py-3 rounded-2xl font-bold text-sm border border-zinc-200 flex items-center gap-2 hover:bg-zinc-100 transition-all">
                        <Download size={18} />
                        Export Log
                    </button>
                </div>
            </div>

            {/* Risk Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[32px] space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="bg-red-500/20 p-3 rounded-2xl text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full italic">Immediate Action</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-zinc-900 tracking-tighter">14 Items</p>
                        <p className="text-zinc-500 text-sm font-bold mt-1">Expiring within 30 days</p>
                    </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-[32px] space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="bg-amber-500/20 p-3 rounded-2xl text-amber-500">
                            <Clock size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full italic">Monitoring</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-zinc-900 tracking-tighter">42 Items</p>
                        <p className="text-zinc-500 text-sm font-bold mt-1">Expiring within 90 days</p>
                    </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-[32px] space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="bg-blue-500/20 p-3 rounded-2xl text-red-500">
                            <Package size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-blue-500/10 px-3 py-1 rounded-full italic">Total Value</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-zinc-900 tracking-tighter">₦4.2M</p>
                        <p className="text-zinc-500 text-sm font-bold mt-1">Estimated risk exposure</p>
                    </div>
                </div>
            </div>

            {/* Expiring List */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search products or batches..."
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-zinc-700 focus:border-red-500 outline-none transition-all placeholder:text-zinc-600"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 font-bold text-sm bg-white px-4 py-3 rounded-xl border border-zinc-200">
                            <Filter size={18} />
                            All Severity
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/50">
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Product & Batch</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Expiry Date</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Stock Level</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="text-right py-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {expiringProducts.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-100/20 transition-colors group">
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-zinc-900 text-sm group-hover:text-red-600 transition-colors">{item.name}</span>
                                            <span className="text-zinc-500 text-xs font-medium uppercase tracking-tighter">{item.id} • {item.batch}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-zinc-500" />
                                            <span className={cn(
                                                "font-black text-sm",
                                                item.status === "Critical" ? "text-red-500" : "text-zinc-700"
                                            )}>{item.expiryDate}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className="font-bold text-zinc-700">{item.stock} units</span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase",
                                            item.status === "Critical" ? "bg-red-500/10 text-red-500" :
                                                item.status === "Warning" ? "bg-amber-500/10 text-amber-500" :
                                                    "bg-blue-500/10 text-red-500"
                                        )}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-black transition-all">
                                                DISCOUNT
                                            </button>
                                            <button className="p-2 hover:bg-zinc-100 rounded-xl transition-all text-zinc-600">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-white/30 border-t border-zinc-200 flex items-center justify-center">
                    <button className="text-zinc-500 hover:text-zinc-900 font-black text-xs uppercase tracking-widest transition-all">
                        Load More Records
                    </button>
                </div>
            </div>
        </div>
    );
}
