"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Download,
    Upload,
    MoreVertical,
    Edit2,
    Trash2,
    Package,
    Boxes,
    History,
    AlertTriangle,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    { id: "PRD-001", name: "Premium Wireless Headset", category: "Electronics", price: "₦12,500.00", stock: 12, status: "In Stock" },
    { id: "PRD-002", name: "Ergonomic Mechanical Keyboard", category: "Computing", price: "₦45,000.00", stock: 5, status: "Low Stock" },
    { id: "PRD-003", name: "Minimalist Desk Lamp", category: "Home Office", price: "₦8,900.00", stock: 20, status: "In Stock" },
    { id: "PRD-004", name: "Smart Water Bottle", category: "Lifestyle", price: "₦15,400.00", stock: 0, status: "Out of Stock" },
    { id: "PRD-005", name: "Leather Carry Bag", category: "Fashion", price: "₦32,000.00", stock: 15, status: "In Stock" },
];

export default function ProductsPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight text-center sm:text-left">Products Inventory</h1>
                    <p className="text-zinc-500 mt-1">Manage your storefront items, pricing and stock levels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-semibold">
                        <Upload size={18} />
                        Bulk Import
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-blue-600/20">
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Inventory Overview Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Items", value: "1,240", icon: Boxes, color: "blue" },
                    { label: "Low Stock", value: "12", icon: AlertTriangle, color: "amber" },
                    { label: "Out of Stock", value: "3", icon: Trash2, color: "red" },
                    { label: "Categories", value: "14", icon: Package, color: "purple" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex items-center gap-5">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                            stat.color === "blue" && "bg-blue-600/10 text-blue-500",
                            stat.color === "amber" && "bg-amber-600/10 text-amber-500",
                            stat.color === "red" && "bg-red-600/10 text-red-500",
                            stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                        )}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Area */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by SKU, name or barcode..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <select className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3.5 text-sm text-zinc-400 focus:border-blue-500 outline-none appearance-none cursor-pointer">
                            <option>Category: All</option>
                            <option>Electronics</option>
                            <option>Computing</option>
                        </select>
                        <select className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3.5 text-sm text-zinc-400 focus:border-blue-500 outline-none appearance-none cursor-pointer">
                            <option>Stock: All</option>
                            <option>In Stock</option>
                            <option>Low Stock</option>
                        </select>
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all font-bold">
                            <Filter size={18} />
                            Filters
                        </button>
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3.5 rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-all">
                            <Download size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest border-b border-zinc-800/50">
                                <th className="px-8 py-6">Listing Product</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Stock Level</th>
                                <th className="px-8 py-6">Unit Price</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {products.map((prd) => (
                                <tr key={prd.id} className="group hover:bg-zinc-800/20 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold overflow-hidden shrink-0">
                                                {prd.name[0]}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-zinc-100 font-bold truncate">{prd.name}</span>
                                                <span className="text-[11px] text-zinc-600 font-medium uppercase tracking-wider">{prd.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-zinc-400">{prd.category}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5 min-w-[120px]">
                                            <span className="text-zinc-100 font-bold text-sm">{prd.stock} Items</span>
                                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        prd.stock > 10 ? "bg-blue-600 w-full" : prd.stock > 0 ? "bg-amber-500 w-1/3" : "bg-red-500 w-0"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-100 font-black">{prd.price}</td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                            prd.status === "In Stock" && "bg-emerald-500/10 text-emerald-500",
                                            prd.status === "Low Stock" && "bg-amber-500/10 text-amber-500",
                                            prd.status === "Out of Stock" && "bg-red-500/10 text-red-500",
                                        )}>
                                            {prd.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
