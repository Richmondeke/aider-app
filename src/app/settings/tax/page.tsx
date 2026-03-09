"use client";

import React from "react";
import { Percent, Info, Plus, Trash2, Edit2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const taxRates = [
    { id: 1, name: "VAT (Value Added Tax)", rate: "7.5%", type: "Sales", status: "Active" },
    { id: 2, name: "Luxury Tax", rate: "12%", type: "Sales", status: "Inactive" },
    { id: 3, name: "WHT (Withholding)", rate: "5%", type: "Purchase", status: "Active" },
];

export default function TaxSettingsPage() {
    return (
        <div className="space-y-8">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4 text-blue-500">
                        <Percent size={32} />
                        <h2 className="text-2xl font-black text-white">Tax Management</h2>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold">
                        <Plus size={18} />
                        New Tax Rule
                    </button>
                </div>

                <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl flex items-start gap-4 mb-10">
                    <Info className="text-blue-500 shrink-0 mt-1" size={20} />
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-zinc-200">Global Tax Override</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Your current effective default tax rate is 7.5%. This is applied to all POS sales and quotations unless overridden at the individual product level.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {taxRates.map((tax) => (
                        <div
                            key={tax.id}
                            className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 font-black">
                                    <Percent size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">{tax.name}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{tax.type} Tax</span>
                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            tax.status === "Active" ? "text-emerald-500" : "text-zinc-600"
                                        )}>{tax.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-10">
                                <div className="text-right">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Applied Rate</p>
                                    <p className="text-3xl font-black text-white mt-1">{tax.rate}</p>
                                </div>
                                <div className="flex items-center gap-3 border-l border-zinc-800 pl-10">
                                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-red-500 transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Compliance Check</p>
                        <p className="text-xs text-zinc-500 font-medium">Your account meets regional Nigerian tax reporting standards.</p>
                    </div>
                </div>
                <button className="text-zinc-400 font-bold text-xs uppercase tracking-widest border-b border-zinc-700 hover:text-white transition-all">
                    Review Laws
                </button>
            </div>
        </div>
    );
}
