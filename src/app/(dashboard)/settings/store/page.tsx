"use client";

import React from "react";
import {
    Store,
    Globe,
    Layout,
    Smartphone,
    Palette,
    Settings,
    ArrowUpRight,
    ExternalLink,
    CheckCircle2,
    Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StoreFrontPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight italic">Store Front</h1>
                    <p className="text-zinc-500 font-medium tracking-tight">Launch your public store and sell directly to customers online.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-emerald-600 text-zinc-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2">
                        View Live Store
                        <ExternalLink size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Section */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Domain & Link */}
                    <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px] space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-600/10 p-3 rounded-2xl text-red-500 italic">
                                <Globe size={24} />
                            </div>
                            <h2 className="text-xl font-black text-zinc-900 italic">Public Identity</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4 italic">Store Subdomain</label>
                                <div className="flex items-center gap-2 bg-white border border-zinc-200 p-2 rounded-2xl focus-within:border-blue-500 transition-all">
                                    <input
                                        type="text"
                                        defaultValue="my-cool-business"
                                        className="bg-transparent border-none outline-none flex-1 py-2 px-4 text-zinc-900 font-bold"
                                    />
                                    <span className="text-zinc-600 font-bold pr-4">.aider.shop</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest px-4 hover:underline cursor-pointer italic">
                                <Lock size={12} />
                                Connect Custom Domain
                            </div>
                        </div>
                    </div>

                    {/* Theme Customizer */}
                    <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px] space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-600/10 p-3 rounded-2xl text-purple-500 italic">
                                <Palette size={24} />
                            </div>
                            <h2 className="text-xl font-black text-zinc-900 italic">Visual Experience</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Brand Color", value: "#3B82F6", type: "color" },
                                { label: "Display Theme", value: "Dark Premium", type: "select" },
                                { label: "Font Style", value: "Outfit Black", type: "select" },
                                { label: "Layout Mode", value: "Bento Grid", type: "select" },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white border border-zinc-200 p-5 rounded-2xl space-y-2">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-900 font-bold">{item.value}</span>
                                        <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: item.type === 'color' ? item.value : 'transparent' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview & Status */}
                <div className="space-y-8">
                    <div className="bg-zinc-50/40 border border-zinc-200 p-8 rounded-[40px] space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase italic tracking-widest">Online</span>
                            <Settings className="text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer" size={18} />
                        </div>

                        <div className="relative aspect-[9/16] bg-white rounded-[32px] border-[8px] border-zinc-200 overflow-hidden shadow-2xl">
                            <div className="absolute inset-x-0 top-0 h-1 bg-blue-500" />
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="w-20 h-4 bg-zinc-100 rounded animate-pulse" />
                                    <Smartphone size={16} className="text-zinc-700" />
                                </div>
                                <div className="aspect-square bg-zinc-50 rounded-2xl animate-pulse" />
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-zinc-100 rounded animate-pulse" />
                                    <div className="w-2/3 h-3 bg-zinc-100 rounded animate-pulse" />
                                </div>
                                <div className="pt-4 grid grid-cols-2 gap-2">
                                    <div className="h-20 bg-zinc-50 rounded-xl animate-pulse" />
                                    <div className="h-20 bg-zinc-50 rounded-xl animate-pulse" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        </div>

                        <p className="text-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">Mobile Storefront Preview</p>
                    </div>

                    <div className="bg-red-600/5 border border-blue-600/10 p-6 rounded-3xl space-y-3">
                        <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest italic">
                            <CheckCircle2 size={16} />
                            Aider Pro Benefit
                        </div>
                        <p className="text-zinc-500 text-xs font-medium leading-relaxed italic">
                            You're currently taking advantage of the automated SEO indexing feature. Your store is being crawled every 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
