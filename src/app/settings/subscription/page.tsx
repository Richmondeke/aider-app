"use client";

import React from "react";
import { Check, CreditCard, ChevronRight, Zap, Crown, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "₦1,500",
        period: "/mo",
        features: ["Up to 100 Products", "1 Storefront", "Basic Reports", "Single User Access"],
        icon: Box,
        isCurrent: false,
        color: "zinc"
    },
    {
        name: "Business",
        price: "₦5,000",
        period: "/mo",
        features: ["Unlimited Products", "3 Storefronts", "Advanced Analytics", "Multi-user Role Sync", "Priority Support"],
        icon: Zap,
        isCurrent: true,
        color: "blue"
    },
    {
        name: "Enterprise",
        price: "₦12,500",
        period: "/mo",
        features: ["Unlimited Storefronts", "Custom Branding", "API Integration", "Dedicated Success Manager", "SLA Guarantee"],
        icon: Crown,
        isCurrent: false,
        color: "purple"
    },
];

export default function SubscriptionPage() {
    return (
        <div className="space-y-10">
            {/* Current Plan Highlight */}
            <div className="bg-blue-600 border border-blue-400 p-10 rounded-[48px] relative overflow-hidden group shadow-2xl shadow-blue-600/20">
                <div className="absolute top-0 right-0 p-12 opacity-10 text-white group-hover:scale-110 transition-transform duration-700">
                    <Zap size={180} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                            Active Plan
                        </span>
                        <div>
                            <h2 className="text-5xl font-black text-white tracking-tighter">Business Pro</h2>
                            <p className="text-blue-100 font-bold mt-2">Renewing on April 09, 2026</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-lg">
                            Manage Billing
                        </button>
                        <button className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/30 hover:border-white w-fit mx-auto md:mx-0">
                            View Invoices
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-white">Upgrade Your Experience</h3>
                <p className="text-zinc-500 font-medium">Select a plan that best fits your growing business needs.</p>
            </div>

            {/* Plans Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={cn(
                            "p-10 rounded-[48px] border flex flex-col justify-between transition-all",
                            plan.isCurrent
                                ? "bg-zinc-900 border-blue-600/50 shadow-2xl"
                                : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                        )}
                    >
                        <div className="space-y-8">
                            <div className={cn(
                                "w-16 h-16 rounded-[24px] flex items-center justify-center",
                                plan.color === "blue" ? "bg-blue-600/10 text-blue-500" :
                                    plan.color === "purple" ? "bg-purple-600/10 text-purple-500" : "bg-zinc-800 text-zinc-500"
                            )}>
                                <plan.icon size={32} />
                            </div>

                            <div>
                                <h4 className="text-xl font-black text-white">{plan.name}</h4>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-3xl font-black text-white">{plan.price}</span>
                                    <span className="text-zinc-500 font-bold text-sm">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold text-zinc-400">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className={cn(
                            "w-full mt-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all",
                            plan.isCurrent
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/10"
                        )}>
                            {plan.isCurrent ? "Current Active Plan" : `Upgrade to ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
