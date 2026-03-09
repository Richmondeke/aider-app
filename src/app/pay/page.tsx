"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    History,
    CreditCard,
    Plus,
    Search,
    ArrowRightLeft,
    Settings2,
    ChevronRight,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const balances = [
    { name: "Main Wallet", value: "₦1,240,500.00", icon: Wallet, color: "blue" },
    { name: "Payouts Account", value: "₦430,200.00", icon: ArrowUpRight, color: "emerald" },
    { name: "Tax Reserve", value: "₦12,400.00", icon: History, color: "purple" },
];

const transactions = [
    { id: "TX-90821", name: "POS Sale - Order #7842", type: "Credit", amount: "₦45,000.00", status: "Success", date: "Today, 2:30 PM" },
    { id: "TX-90820", name: "Wallet Funding", type: "Credit", amount: "₦200,000.00", status: "Success", date: "Today, 11:15 AM" },
    { id: "TX-90819", name: "Withdrawal to GTBank", type: "Debit", amount: "₦50,000.00", status: "Pending", date: "Today, 9:20 AM" },
    { id: "TX-90818", name: "Vendor Payment - Acme", type: "Debit", amount: "₦12,400.00", status: "Success", date: "Yesterday, 4:45 PM" },
];

export default function PayPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Aider Pay</h1>
                    <p className="text-zinc-500 mt-1">Manage your business finances and payments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-semibold">
                        <Download size={18} />
                        Export Statement
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-blue-600/20">
                        <Plus size={20} />
                        Add Funds
                    </button>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {balances.map((balance) => (
                    <motion.div
                        key={balance.name}
                        whileHover={{ y: -5 }}
                        className="bg-zinc-900 border border-zinc-800 p-8 rounded-[32px] relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                                balance.color === "blue" && "bg-blue-600/10 text-blue-500",
                                balance.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                                balance.color === "purple" && "bg-purple-600/10 text-purple-500",
                            )}>
                                <balance.icon size={24} />
                            </div>
                            <span className="text-sm font-medium text-zinc-500">{balance.name}</span>
                            <h2 className="text-3xl font-bold text-white mt-1">{balance.value}</h2>

                            <div className="mt-8 flex items-center gap-4">
                                <button className="flex-1 bg-zinc-800/50 hover:bg-zinc-800 text-white py-2 rounded-xl text-xs font-bold transition-all">
                                    Withdraw
                                </button>
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition-all">
                                    Details
                                </button>
                            </div>
                        </div>
                        {/* Design elements */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <CreditCard size={120} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Transaction Log */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[32px]">
                        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Transfer Funds", icon: ArrowRightLeft, desc: "Send money internal or external" },
                                { name: "Bill Payment", icon: CreditCard, desc: "Pay utilities and vendors" },
                                { name: "Payer Links", icon: Settings2, desc: "Manage payment collections" },
                            ].map((action) => (
                                <button
                                    key={action.name}
                                    className="w-full flex items-center gap-4 p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/30 transition-all group text-left"
                                >
                                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-500 transition-colors">
                                        <action.icon size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-zinc-100">{action.name}</p>
                                        <p className="text-xs text-zinc-500 truncate">{action.desc}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] text-white">
                        <h3 className="text-xl font-bold mb-2">Upgrade Account</h3>
                        <p className="text-blue-100 text-sm mb-6">Increase your withdrawal limits and get a premium card.</p>
                        <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right: Transaction Logs */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Transaction Logs</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search tx ID or name"
                                className="bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:border-blue-500 outline-none transition-all w-64"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-800/50">
                                    <th className="px-8 py-4 text-left">Recipient / Source</th>
                                    <th className="px-8 py-4 text-left">Type</th>
                                    <th className="px-8 py-4 text-left">Amount</th>
                                    <th className="px-8 py-4 text-left">Status</th>
                                    <th className="px-8 py-4 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="group hover:bg-zinc-800/20 transition-all">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-zinc-200">{tx.name}</span>
                                                <span className="text-[11px] text-zinc-500">{tx.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "text-xs font-bold",
                                                tx.type === "Credit" ? "text-emerald-500" : "text-amber-500"
                                            )}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-zinc-100">{tx.amount}</td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold",
                                                tx.status === "Success" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                            )}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-zinc-500 text-xs text-right whitespace-nowrap">{tx.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-zinc-800 text-center">
                        <button className="text-zinc-500 hover:text-white text-xs font-bold transition-all">
                            View All Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
