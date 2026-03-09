"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wallet,
    ArrowUpRight,
    History,
    Plus,
    Search,
    ArrowRightLeft,
    CreditCard,
    Settings2,
    ChevronRight,
    Download,
    Loader2,
    CheckCircle2,
    X,
    ArrowDownLeft,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { transactionsService } from "@/lib/firebase/service";
import type { Transaction } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

const balances = [
    { name: "Main Wallet", value: "₦1,240,500.00", sub: "+₦45,000 today", icon: Wallet, trend: "up" },
    { name: "Payouts Account", value: "₦430,200.00", sub: "Last payout: ₦50,000", icon: ArrowUpRight, trend: "neutral" },
    { name: "Tax Reserve", value: "₦12,400.00", sub: "Q1 estimated reserve", icon: History, trend: "neutral" },
];

function fmt(amount: number) {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
}

type ModalType = "add-funds" | "withdraw" | "transfer" | "bill" | "links" | "export" | null;

function Drawer({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm" onClick={onClose} />
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
                            <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function FeedbackOverlay({ message, onClose }: { message: string; onClose: () => void }) {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm" onClick={onClose} />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white border border-zinc-100 rounded-2xl shadow-2xl p-8 w-full max-w-xs text-center">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-1">Done!</h3>
                    <p className="text-sm text-zinc-500 mb-6">{message}</p>
                    <button onClick={onClose} className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">
                        Close
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function FormField({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">{label}</label>
            <input name={name} type={type} placeholder={placeholder} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400" />
        </div>
    );
}

export default function PayPage() {
    const { user } = useAuth();
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const { data: txList, loading: txLoading } = useFirestoreCollection<Transaction>("transactions", [orderBy("createdAt", "desc")]);

    const openModal = (m: ModalType) => setActiveModal(m);
    const closeModal = () => setActiveModal(null);

    const handleAction = async (msg: string, txData?: Omit<Transaction, "id" | "createdAt">) => {
        setIsLoading(true);
        if (user?.uid && txData) {
            await transactionsService.add(user.uid, txData).catch(console.error);
        } else {
            await new Promise(r => setTimeout(r, 900));
        }
        setIsLoading(false);
        closeModal();
        setSuccessMsg(msg);
    };

    const filteredTx = txList.filter(t =>
        t.description?.toLowerCase().includes(search.toLowerCase()) || t.id?.includes(search)
    );

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Aider Pay</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Manage your business finances and payments</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => openModal("export")} className="btn-ghost text-sm">
                        <Download size={15} />
                        Export Statement
                    </button>
                    <button onClick={() => openModal("add-funds")} className="btn-primary text-sm">
                        <Plus size={16} />
                        Add Funds
                    </button>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {balances.map((bal) => (
                    <motion.div
                        key={bal.name}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.15 }}
                        className="card p-6 group"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-500">
                                <bal.icon size={18} strokeWidth={1.75} />
                            </div>
                            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">{bal.name}</span>
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 tracking-tight">{bal.value}</p>
                        <p className="text-xs text-zinc-400 mt-1 mb-5">{bal.sub}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openModal("withdraw")} className="flex-1 text-xs font-semibold py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all">
                                Withdraw
                            </button>
                            <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-all">
                                Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="card p-5">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Quick Actions</h3>
                        <div className="space-y-1">
                            {[
                                { name: "Transfer Funds", icon: ArrowRightLeft, desc: "Internal or external", modal: "transfer" as ModalType },
                                { name: "Bill Payment", icon: CreditCard, desc: "Pay utilities and vendors", modal: "bill" as ModalType },
                                { name: "Payer Links", icon: Settings2, desc: "Manage payment links", modal: "links" as ModalType },
                            ].map((action) => (
                                <button
                                    key={action.name}
                                    onClick={() => openModal(action.modal)}
                                    className="w-full flex items-center gap-3 p-3 bg-white border border-transparent rounded-xl hover:border-zinc-200 hover:bg-zinc-50 transition-all group text-left"
                                >
                                    <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-red-500 group-hover:border-red-100 group-hover:bg-red-50 transition-all">
                                        <action.icon size={16} strokeWidth={1.75} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-zinc-900">{action.name}</p>
                                        <p className="text-[11px] text-zinc-400 truncate">{action.desc}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Upgrade CTA — no gradient */}
                    <div className="card p-5 border-zinc-900 bg-zinc-900">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                            <ArrowUpRight size={16} className="text-white" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">Upgrade Account</h3>
                        <p className="text-xs text-zinc-400 mb-4">Increase withdrawal limits and get a premium business card.</p>
                        <button className="w-full bg-white text-zinc-900 font-semibold py-2.5 rounded-lg text-xs hover:bg-zinc-100 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Transaction Log */}
                <div className="lg:col-span-2 card flex flex-col overflow-hidden">
                    <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-zinc-900">Transaction Logs</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ID or name"
                                className="bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-4 text-xs text-zinc-900 outline-none transition-all w-52 placeholder:text-zinc-400"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-50">
                                    <th className="px-5 py-3 text-left">Recipient / Source</th>
                                    <th className="px-5 py-3 text-left">Type</th>
                                    <th className="px-5 py-3 text-left">Amount</th>
                                    <th className="px-5 py-3 text-left">Status</th>
                                    <th className="px-5 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {txLoading ? (
                                    <tr><td colSpan={5} className="px-5 py-10 text-center"><Loader2 size={22} className="animate-spin text-zinc-300 mx-auto" /></td></tr>
                                ) : filteredTx.map((tx) => (
                                    <tr key={tx.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className={cn(
                                                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                                                    tx.type === "Credit" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                                                )}>
                                                    {tx.type === "Credit" ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-zinc-900 leading-none">{tx.description}</p>
                                                    <p className="text-[11px] text-zinc-400 mt-0.5">{tx.id?.slice(-8).toUpperCase() ?? ""}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn("text-xs font-semibold", tx.type === "Credit" ? "text-emerald-600" : "text-zinc-500")}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-zinc-900">{fmt(tx.amount)}</td>
                                        <td className="px-5 py-4">
                                            <span className={cn("badge",
                                                tx.status === "Success" ? "badge-success" :
                                                    tx.status === "Pending" ? "badge-warning" : "badge-danger"
                                            )}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-[11px] text-zinc-400 text-right whitespace-nowrap">
                                            {tx.createdAt?.toDate
                                                ? tx.createdAt.toDate().toLocaleDateString("en-NG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                                {filteredTx.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-10 text-center text-sm text-zinc-400">
                                            No transactions match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-3 border-t border-zinc-50 text-center">
                        <button className="text-[12px] font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
                            View All Transactions →
                        </button>
                    </div>
                </div>
            </div>

            {/* === Drawers === */}

            {/* Add Funds */}
            <Drawer isOpen={activeModal === "add-funds"} onClose={closeModal} title="Add Funds">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Funds added successfully to your Main Wallet."); }} className="space-y-5">
                    <FormField label="Amount (NGN)" name="amount" type="number" placeholder="0.00" />
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">Funding Source</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all appearance-none">
                            <option>Bank Transfer (GTBank)</option>
                            <option>Card Payment</option>
                            <option>USSD</option>
                        </select>
                    </div>
                    <FormField label="Reference (Optional)" name="ref" placeholder="Add a note" />
                    <div className="pt-2">
                        <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Add Funds"}
                        </button>
                    </div>
                </form>
            </Drawer>

            {/* Withdraw */}
            <Drawer isOpen={activeModal === "withdraw"} onClose={closeModal} title="Withdraw Funds">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Withdrawal submitted. Funds arrive in 30 minutes."); }} className="space-y-5">
                    <FormField label="Amount (NGN)" name="amount" type="number" placeholder="Min ₦1,000" />
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">Destination Account</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none appearance-none">
                            <option>GTBank •••• 4521</option>
                            <option>First Bank •••• 8834</option>
                        </select>
                    </div>
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700">Withdrawals are processed within 30 minutes on business days.</p>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Confirm Withdrawal"}
                    </button>
                </form>
            </Drawer>

            {/* Transfer Funds */}
            <Drawer isOpen={activeModal === "transfer"} onClose={closeModal} title="Transfer Funds">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Transfer was sent successfully."); }} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">Transfer Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {["Internal", "External"].map(t => (
                                <label key={t} className="flex items-center gap-2 p-3 border border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-900 has-[:checked]:border-zinc-900">
                                    <input type="radio" name="transfer_type" value={t.toLowerCase()} defaultChecked={t === "Internal"} className="accent-zinc-900" />
                                    <span className="text-sm font-medium text-zinc-700">{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <FormField label="Recipient Account / Wallet" name="recipient" placeholder="Account number or @handle" />
                    <FormField label="Amount (NGN)" name="amount" type="number" placeholder="0.00" />
                    <FormField label="Description" name="desc" placeholder="What is this for?" />
                    <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Send Transfer"}
                    </button>
                </form>
            </Drawer>

            {/* Bill Payment */}
            <Drawer isOpen={activeModal === "bill"} onClose={closeModal} title="Bill Payment">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Bill payment processed successfully."); }} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">Bill Category</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none appearance-none">
                            <option>Electricity (NEPA/PHCN)</option>
                            <option>Internet / Data</option>
                            <option>Vendor Invoice</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <FormField label="Amount (NGN)" name="amount" type="number" placeholder="0.00" />
                    <FormField label="Meter / Account Number" name="meter" placeholder="Enter meter or account number" />
                    <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Pay Bill"}
                    </button>
                </form>
            </Drawer>

            {/* Payer Links */}
            <Drawer isOpen={activeModal === "links"} onClose={closeModal} title="Payer Links">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Payment link created and copied to clipboard."); }} className="space-y-5">
                    <FormField label="Link Name" name="link_name" placeholder="e.g. Invoice #1042 Payment" />
                    <FormField label="Amount (NGN, leave blank for any)" name="amount" type="number" placeholder="Optional fixed amount" />
                    <FormField label="Expiry (Optional)" name="expiry" type="date" />
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                        <p className="text-xs text-zinc-500 font-medium mb-1">Generated Link Preview</p>
                        <p className="text-sm font-bold text-zinc-900 break-all">pay.aider.app/lnk_xxxxxxxxxxxxx</p>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Create & Copy Link"}
                    </button>
                </form>
            </Drawer>

            {/* Export Statement */}
            <Drawer isOpen={activeModal === "export"} onClose={closeModal} title="Export Statement">
                <form onSubmit={(e) => { e.preventDefault(); handleAction("Statement exported and downloading now."); }} className="space-y-5">
                    <FormField label="Date From" name="from" type="date" />
                    <FormField label="Date To" name="to" type="date" />
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wide">Format</label>
                        <div className="grid grid-cols-3 gap-2">
                            {["PDF", "CSV", "XLSX"].map(f => (
                                <label key={f} className="flex items-center justify-center gap-1 p-2.5 border border-zinc-200 rounded-xl cursor-pointer text-sm font-semibold text-zinc-700 hover:border-zinc-900 has-[:checked]:border-zinc-900 has-[:checked]:text-zinc-900 has-[:checked]:bg-zinc-50">
                                    <input type="radio" name="format" value={f} defaultChecked={f === "PDF"} className="sr-only" />
                                    {f}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full btn-primary justify-center py-3">
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Export Statement"}
                    </button>
                </form>
            </Drawer>

            {/* Feedback */}
            {successMsg && <FeedbackOverlay message={successMsg} onClose={() => setSuccessMsg(null)} />}
        </div>
    );
}
