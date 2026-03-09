"use client";

import React from "react";
import { Store, Globe, Hash, Clock, MapPin, CheckCircle2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessSettingsPage() {
    return (
        <div className="space-y-8 pb-20">
            {/* Business Identity */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10 space-y-8">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600/10 p-3 rounded-2xl text-blue-500">
                            <Store size={24} />
                        </div>
                        <h3 className="text-xl font-black text-white">Business Identity</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Registered Entity Name</label>
                        <input
                            defaultValue="Aider Inventory Solutions"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Business Category</label>
                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 focus:border-blue-500 outline-none appearance-none">
                            <option>Retail & Supermarket</option>
                            <option>Pharmacy & Healthcare</option>
                            <option>Electronics Store</option>
                            <option>Restaurant & Cafe</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Main Business Address</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" />
                            <input
                                defaultValue="No 12, Admiralty Way, Lekki Phase 1, Lagos"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-zinc-300 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Official Website</label>
                        <div className="relative">
                            <Globe size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" />
                            <input
                                defaultValue="https://aider.app"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-zinc-300 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Operation Controls */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10 space-y-8">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-600/10 p-3 rounded-2xl text-purple-500">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-xl font-black text-white">System Configuration</h3>
                    </div>
                </div>

                <div className="space-y-6">
                    {[
                        { id: "low-stock", title: "Low Stock Alerts", desc: "Notify via email when items fall below safety threshold", active: true },
                        { id: "auto-invoice", title: "Auto-Generate Invoices", desc: "Automatically create PDF invoices on every POS sale", active: true },
                        { id: "multi-currency", title: "Multi-Currency Checkout", desc: "Allows customers to pay in USD, GBP or NGN", active: false },
                        { id: "public-store", title: "Public Storefront", desc: "Host a public catalog of your available inventory online", active: true },
                    ].map((toggle) => (
                        <div key={toggle.id} className="flex items-center justify-between p-6 bg-zinc-950/30 rounded-[24px] border border-zinc-800/50">
                            <div className="space-y-1">
                                <p className="text-white font-bold text-sm tracking-tight">{toggle.title}</p>
                                <p className="text-zinc-600 text-xs font-medium">{toggle.desc}</p>
                            </div>
                            <div className={cn(
                                "w-12 h-6 rounded-full relative transition-all cursor-pointer",
                                toggle.active ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-zinc-800"
                            )}>
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                    toggle.active ? "left-7" : "left-1"
                                )} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <button className="bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
                        Apply Config Changes
                        <Save size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
