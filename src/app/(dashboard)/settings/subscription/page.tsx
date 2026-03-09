"use client";

import React from "react";
import { CheckCircle2, Zap, Building2, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
    {
        id: "starter",
        name: "Starter",
        price: "Free",
        period: "",
        icon: Zap,
        description: "Perfect for solo operators just getting started.",
        features: ["Up to 50 products", "5 sales/day", "Basic reports", "1 user account"],
        cta: "Current Plan",
        current: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: "₦5,000",
        period: "/month",
        icon: Building2,
        description: "For growing businesses that need more power.",
        features: ["Unlimited products", "Unlimited sales", "Full analytics", "5 user accounts", "Quotations", "Priority support"],
        cta: "Upgrade to Pro",
        current: true,
        highlight: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "",
        icon: Crown,
        description: "For large teams with advanced needs.",
        features: ["Everything in Pro", "Unlimited users", "Custom integrations", "Dedicated account manager", "SLA & uptime guarantee"],
        cta: "Contact Sales",
        current: false,
    },
];

export default function SubscriptionPage() {
    return (
        <div className="space-y-5">
            {/* Current Plan Banner */}
            <div className="card p-5 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Current Plan</p>
                    <p className="text-xl font-black text-zinc-900 mt-0.5">Pro · Premium Member</p>
                    <p className="text-xs text-zinc-400 mt-1">Next billing date: April 9, 2026</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="badge badge-success">Active</span>
                    <button className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">
                        Manage Billing
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map(plan => (
                    <div key={plan.id} className={cn("card p-6 flex flex-col", plan.highlight && "ring-2 ring-red-600")}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", plan.highlight ? "bg-red-600 text-white" : "bg-zinc-50 text-zinc-400")}>
                                <plan.icon size={17} />
                            </div>
                            {plan.current && <span className="badge badge-danger text-[10px]">Your Plan</span>}
                        </div>
                        <h3 className="text-base font-black text-zinc-900">{plan.name}</h3>
                        <div className="flex items-baseline gap-0.5 mt-1 mb-2">
                            <span className="text-2xl font-black text-zinc-900">{plan.price}</span>
                            <span className="text-xs text-zinc-400">{plan.period}</span>
                        </div>
                        <p className="text-[12px] text-zinc-400 mb-4">{plan.description}</p>
                        <ul className="space-y-2 flex-1">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-[12px] text-zinc-600">
                                    <CheckCircle2 size={13} className={plan.highlight ? "text-red-500" : "text-emerald-400"} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            disabled={plan.current}
                            className={cn(
                                "mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-all",
                                plan.current
                                    ? "bg-zinc-100 text-zinc-400 cursor-default"
                                    : plan.highlight
                                        ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20"
                                        : "bg-zinc-900 text-white hover:bg-zinc-700"
                            )}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            {/* Billing History */}
            <div className="card p-6">
                <h3 className="text-sm font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100">Billing History</h3>
                <div className="space-y-1">
                    {[
                        { date: "Mar 9, 2026", amount: "₦5,000", status: "Paid", period: "March 2026" },
                        { date: "Feb 9, 2026", amount: "₦5,000", status: "Paid", period: "February 2026" },
                        { date: "Jan 9, 2026", amount: "₦5,000", status: "Paid", period: "January 2026" },
                    ].map((inv, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0">
                            <div>
                                <p className="text-sm font-semibold text-zinc-800">{inv.period}</p>
                                <p className="text-[11px] text-zinc-400">{inv.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-zinc-900">{inv.amount}</span>
                                <span className="badge badge-success">{inv.status}</span>
                                <button className="text-[11px] font-bold text-zinc-400 hover:text-zinc-700 transition-all">Download</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
