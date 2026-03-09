"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    Settings as SettingsIcon,
    CreditCard,
    ShieldCheck,
    Bell,
    Mail,
    Percent,
    LogOut,
    Store
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
    { name: "My Profile", href: "/settings/profile", icon: User },
    { name: "Business Details", href: "/settings/business", icon: Store },
    { name: "Subscription", href: "/settings/subscription", icon: CreditCard },
    { name: "Tax Management", href: "/settings/tax", icon: Percent },
    { name: "Security", href: "/settings/security", icon: ShieldCheck },
    { name: "Notifications", href: "/settings/notifications", icon: Bell },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="max-w-[1500px] mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Account Settings</h1>
                <p className="text-zinc-500 mt-1">Manage your identity, business configuration and platform preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-[320px] bg-zinc-50/40 border border-zinc-200 rounded-[40px] p-4 shrink-0">
                    <nav className="space-y-2">
                        {settingsNav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold group",
                                        isActive
                                            ? "bg-red-600 text-white shadow-xl shadow-blue-600/10"
                                            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                                    )}
                                >
                                    <item.icon size={20} className={cn(isActive ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-500")} />
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-zinc-200">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold">
                            <LogOut size={20} />
                            <span className="text-sm">Log Out Account</span>
                        </button>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
