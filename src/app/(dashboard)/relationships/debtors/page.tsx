"use client";

import React from "react";
import {
    ShieldAlert,
    Search,
    Filter,
    ArrowUpRight,
    Calendar,
    User,
    Phone,
    MoreVertical,
    Download,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const debtors = [
    {
        id: "DBT-001",
        name: "Success Enterprises",
        phone: "0803 112 3344",
        amount: "₦250,000.00",
        dueDate: "Mar 15, 2026",
        daysOverdue: 0,
        status: "Pending"
    },
    {
        id: "DBT-002",
        name: "Ibrahim Musa",
        phone: "0706 778 9900",
        amount: "₦12,500.00",
        dueDate: "Mar 05, 2026",
        daysOverdue: 4,
        status: "Overdue"
    },
    {
        id: "DBT-003",
        name: "Esther Williams",
        phone: "0812 445 6677",
        amount: "₦89,400.00",
        dueDate: "Feb 28, 2026",
        daysOverdue: 10,
        status: "Critical"
    },
];

export default function DebtorsPage() {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-3xl text-red-500">
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Debtor List</h1>
                        <p className="text-zinc-500 mt-1">Track and manage all outstanding credit sales and collections.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Download size={18} />
                        Export List
                    </button>
                </div>
            </div>

            {/* Debt Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-red-500">
                        <DollarSign size={80} />
                    </div>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Outstanding</p>
                    <p className="text-4xl font-black text-zinc-900 mt-1">₦351,900.00</p>
                    <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold">
                        <TrendingUp size={16} />
                        +12.5% from last month
                    </div>
                </div>
                <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px]">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Immediate Attention</p>
                    <p className="text-4xl font-black text-amber-500 mt-1">12 Patients</p>
                    <p className="text-zinc-600 text-xs font-medium mt-2">Dues exceeding 15 days</p>
                </div>
                <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px]">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Collections Success</p>
                    <p className="text-4xl font-black text-emerald-500 mt-1">78%</p>
                    <p className="text-zinc-600 text-xs font-medium mt-2">Recovery rate this Quarter</p>
                </div>
            </div>

            {/* List Container */}
            <div className="bg-zinc-50/40 border border-zinc-200 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-zinc-200 bg-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            placeholder="Filter by name, ID or phone..."
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 focus:border-red-500/50 outline-none transition-all"
                        />
                    </div>
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all font-bold">
                        <Filter size={18} />
                        Severity
                    </button>
                </div>

                <div className="divide-y divide-zinc-800/50">
                    {debtors.map((debt) => (
                        <div
                            key={debt.id}
                            className="group p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-zinc-100/10 transition-all"
                        >
                            <div className="flex items-center gap-6 min-w-0 flex-1">
                                <div className={cn(
                                    "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border",
                                    debt.status === "Critical" ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-zinc-100 border-zinc-700/50 text-zinc-500"
                                )}>
                                    <User size={32} />
                                </div>
                                <div className="min-w-0 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">{debt.id}</span>
                                        {debt.daysOverdue > 0 && (
                                            <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
                                                {debt.daysOverdue} Days Passed
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-black text-zinc-900 truncate">{debt.name}</h3>
                                    <div className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
                                        <Phone size={14} />
                                        {debt.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 text-right">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Due Date</span>
                                    <div className="flex items-center gap-2 text-zinc-900 font-bold">
                                        <Calendar size={14} className="text-zinc-600" />
                                        {debt.dueDate}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Amount Due</span>
                                    <span className={cn(
                                        "text-2xl font-black",
                                        debt.status === "Critical" ? "text-red-500" : "text-zinc-900"
                                    )}>
                                        {debt.amount}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="bg-red-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                                        Collect
                                    </button>
                                    <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-500 hover:text-zinc-900 transition-all">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TrendingUp(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    );
}
