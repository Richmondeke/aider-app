"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    CreditCard,
    ShoppingBag,
    History,
    FileText,
    UserSquare,
    BadgeDollarSign,
    Settings,
    ChevronDown,
    Menu,
    X,
    Users2,
    Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Aider Pay", icon: CreditCard, href: "/pay" },
    { name: "Make a Sale", icon: ShoppingBag, href: "/sell" },
    { name: "Sales History", icon: History, href: "/sales-history" },
    {
        name: "Inventory",
        icon: Boxes,
        href: "/inventory",
        children: [
            { name: "Products", href: "/inventory/products" },
            { name: "Product History", href: "/inventory/history" },
            { name: "Expiring Products", href: "/inventory/expiring" },
            { name: "Purchases", href: "/inventory/purchases" },
        ]
    },
    {
        name: "Relationships",
        icon: Users2,
        href: "/relationships",
        children: [
            { name: "Suppliers", href: "/relationships/suppliers" },
            { name: "Customers", href: "/relationships/customers" },
            { name: "Debtor List", href: "/relationships/debtors" },
        ]
    },
    { name: "Quotation", icon: FileText, href: "/quotation" },
    { name: "Employees", icon: UserSquare, href: "/employees" },
    {
        name: "Financials",
        icon: BadgeDollarSign,
        href: "/financials",
        children: [
            { name: "Expenses/Bills", href: "/financials/expenses" },
            { name: "Accounting & Reports", href: "/financials/accounting" },
        ]
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/settings",
        children: [
            { name: "Profile", href: "/settings/profile" },
            { name: "Business", href: "/settings/business" },
            { name: "Subscription", href: "/settings/subscription" },
            { name: "Tax", href: "/settings/tax" },
            { name: "Store Front", href: "/settings/store" },
        ]
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (name: string) => {
        setExpandedItems((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? 72 : 256 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-screen bg-white border-r border-zinc-100 flex flex-col relative z-50 shrink-0"
        >
            {/* Logo Bar */}
            <div className={cn(
                "h-16 flex items-center justify-between px-4 border-b border-zinc-100",
                isCollapsed && "justify-center"
            )}>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="Aider" className="h-7 w-auto" />
                    </motion.div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                >
                    {isCollapsed ? <Menu size={18} /> : <X size={18} />}
                </button>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto scrollbar-none py-3 px-2 space-y-0.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const isExpanded = expandedItems.includes(item.name);
                    const hasChildren = item.children && item.children.length > 0;

                    return (
                        <div key={item.name}>
                            <div
                                onClick={() => hasChildren && toggleExpand(item.name)}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer group/item",
                                    isCollapsed && "justify-center px-0 py-3",
                                    isActive
                                        ? "bg-red-50 text-red-600"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                )}
                            >
                                {!hasChildren ? (
                                    <Link href={item.href} className="flex items-center gap-2.5 w-full">
                                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.75} className="shrink-0" />
                                        {!isCollapsed && (
                                            <span className={cn("text-sm font-medium", isActive && "font-semibold")}>
                                                {item.name}
                                            </span>
                                        )}
                                    </Link>
                                ) : (
                                    <>
                                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.75} className="shrink-0" />
                                        {!isCollapsed && (
                                            <div className="flex items-center justify-between flex-1">
                                                <span className={cn("text-sm font-medium", isActive && "font-semibold")}>
                                                    {item.name}
                                                </span>
                                                <ChevronDown
                                                    size={14}
                                                    strokeWidth={2}
                                                    className={cn("transition-transform duration-200 text-zinc-400", isExpanded && "rotate-180")}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <AnimatePresence>
                                {hasChildren && isExpanded && !isCollapsed && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-4 pl-3 border-l border-zinc-100 my-1 space-y-0.5">
                                            {item.children?.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className={cn(
                                                        "block py-2 px-3 text-[13px] rounded-lg transition-all",
                                                        pathname === child.href
                                                            ? "text-red-600 bg-red-50 font-semibold"
                                                            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                                                    )}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-zinc-100">
                <div className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg",
                    isCollapsed && "justify-center"
                )}>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        JD
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-zinc-900 truncate">John Doe</span>
                            <span className="text-[11px] text-zinc-400 truncate">Admin Account</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
