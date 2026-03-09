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
    Package,
    Users,
    FileText,
    UserSquare,
    BadgeDollarSign,
    Settings,
    ChevronRight,
    Menu,
    X,
    ChevronDown,
    Warehouse,
    Truck,
    Users2,
    Wallet,
    Receipt,
    PieChart,
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
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col relative z-50 group"
        >
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                            A
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Aider</span>
                    </motion.div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-4 space-y-2 py-4">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const isExpanded = expandedItems.includes(item.name);
                    const hasChildren = item.children && item.children.length > 0;

                    return (
                        <div key={item.name} className="space-y-1">
                            <div
                                onClick={() => hasChildren && toggleExpand(item.name)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer group/item",
                                    isActive ? "bg-blue-600/10 text-blue-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100",
                                    isCollapsed && "justify-center px-0"
                                )}
                            >
                                {!hasChildren ? (
                                    <Link href={item.href} className="flex items-center gap-3 w-full">
                                        <item.icon size={22} className={cn(isActive ? "text-blue-400" : "text-zinc-400 group-hover/item:text-zinc-100")} />
                                        {!isCollapsed && <span className="font-medium text-[15px]">{item.name}</span>}
                                    </Link>
                                ) : (
                                    <>
                                        <item.icon size={22} className={cn(isActive ? "text-blue-400" : "text-zinc-400 group-hover/item:text-zinc-100")} />
                                        {!isCollapsed && (
                                            <div className="flex items-center justify-between flex-1">
                                                <span className="font-medium text-[15px]">{item.name}</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={cn("transition-transform duration-200 text-zinc-500", isExpanded && "rotate-180")}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Sub-items */}
                            <AnimatePresence>
                                {hasChildren && isExpanded && !isCollapsed && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden pl-10 space-y-1"
                                    >
                                        {item.children?.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={cn(
                                                    "block py-2 px-3 text-[14px] rounded-lg transition-colors",
                                                    pathname === child.href ? "text-blue-400 bg-blue-600/5" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/30"
                                                )}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-zinc-800">
                <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50", isCollapsed && "justify-center p-2")}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        JD
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-zinc-100 truncate">John Doe</span>
                            <span className="text-xs text-zinc-500 truncate">Admin Account</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
