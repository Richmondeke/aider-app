"use client";

import React from "react";
import {
    ShoppingBag,
    Plus,
    Search,
    Filter,
    ChevronRight,
    Truck,
    CheckCircle2,
    Clock,
    MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
    { id: "PO-8821", vendor: "Acme Electronics Ltd", items: 42, total: "₦1,240,000.00", status: "Received", date: "Today" },
    { id: "PO-8820", vendor: "Focus Computing", items: 12, total: "₦430,000.00", status: "Pending", date: "Yesterday" },
    { id: "PO-8819", vendor: "Lifestyle Brands Co", items: 5, total: "₦12,400.00", status: "Transit", date: "Yesterday" },
    { id: "PO-8818", vendor: "Acme Electronics Ltd", items: 10, total: "₦85,000.00", status: "Cancelled", date: "Mar 5, 2026" },
];

export default function PurchasesPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Purchase Orders</h1>
                    <p className="text-zinc-500 mt-1">Manage vendor stock orders and inventory replenishments.</p>
                </div>
                <button className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-red-600/20">
                    <Plus size={20} />
                    New Purchase
                </button>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-zinc-50/50 border border-zinc-200 p-1.5 rounded-2xl w-fit">
                {["All Orders", "Pending", "Transit", "Received", "Cancelled"].map((tab) => (
                    <button
                        key={tab}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-xs font-bold transition-all",
                            tab === "All Orders" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="group bg-zinc-50/40 border border-zinc-200 hover:border-zinc-700 rounded-[32px] p-8 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all"
                    >
                        <div className="flex items-center gap-6 flex-1">
                            <div className={cn(
                                "w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 border border-zinc-200",
                                order.status === "Received" && "bg-emerald-500/10 text-emerald-500",
                                order.status === "Pending" && "bg-amber-500/10 text-amber-500",
                                order.status === "Transit" && "bg-blue-500/10 text-red-500",
                                order.status === "Cancelled" && "bg-red-500/10 text-red-500",
                            )}>
                                {order.status === "Received" && <CheckCircle2 size={32} />}
                                {order.status === "Pending" && <Clock size={32} />}
                                {order.status === "Transit" && <Truck size={32} />}
                                {order.status === "Cancelled" && <ShoppingBag size={32} />}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{order.id}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span className="text-zinc-500 text-xs font-bold">{order.date}</span>
                                </div>
                                <h3 className="text-xl font-black text-zinc-900">{order.vendor}</h3>
                                <p className="text-zinc-500 text-sm font-medium">{order.items} unique items in this order</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-12">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Total Cost</span>
                                <span className="text-2xl font-black text-zinc-900">{order.total}</span>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <span className={cn(
                                    "inline-flex items-center justify-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-center",
                                    order.status === "Received" && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                                    order.status === "Pending" && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
                                    order.status === "Transit" && "bg-blue-500/10 text-red-500 border border-blue-500/20",
                                    order.status === "Cancelled" && "bg-red-500/10 text-red-500 border border-red-500/20",
                                )}>
                                    {order.status}
                                </span>
                                <button className="text-zinc-500 hover:text-zinc-900 text-[10px] font-bold uppercase tracking-widest transition-all">
                                    View full PO
                                </button>
                            </div>
                            <button className="p-3 bg-white border border-zinc-200 rounded-2xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
