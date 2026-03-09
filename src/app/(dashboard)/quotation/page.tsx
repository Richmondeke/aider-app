"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText, Plus, Search, Send, CheckCircle2,
    Clock, XCircle, X, Loader2, TrendingUp, FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { quotationsService } from "@/lib/firebase/service";
import type { Quotation } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

type FeedbackType = "success" | "error" | null;

const STATUS_BADGE: Record<string, string> = {
    Draft: "badge-neutral",
    Sent: "badge-warning",
    Accepted: "badge-success",
    Expired: "badge-danger",
    Rejected: "badge-danger",
};

function SkeletonRow() {
    return (
        <tr className="animate-pulse border-b border-zinc-50">
            {[...Array(6)].map((_, i) => <td key={i} className="px-5 py-4"><div className="h-3.5 bg-zinc-100 rounded w-3/4" /></td>)}
        </tr>
    );
}

const EMPTY_FORM = { clientName: "", items: "", totalAmount: "", validDays: "30", notes: "" };

export default function QuotationPage() {
    const { user } = useAuth();
    const { data: quotations, loading } = useFirestoreCollection<Quotation>("quotations", [orderBy("createdAt", "desc")]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: FeedbackType; msg: string } | null>(null);

    const filtered = quotations.filter(q => q.clientName?.toLowerCase().includes(search.toLowerCase()));

    const totalAccepted = quotations.filter(q => q.status === "Accepted").reduce((s, q) => s + (q.totalAmount || 0), 0);
    const pending = quotations.filter(q => q.status === "Sent").length;
    const conversionRate = quotations.length ? Math.round((quotations.filter(q => q.status === "Accepted").length / quotations.length) * 100) : 0;

    const handleSave = async () => {
        if (!user?.uid || !form.clientName || !form.totalAmount) return;
        setSaving(true);
        try {
            await quotationsService.add(user.uid, {
                clientName: form.clientName,
                items: Number(form.items) || 1,
                totalAmount: Number(form.totalAmount),
                validDays: Number(form.validDays) || 30,
                notes: form.notes,
                status: "Draft",
            });
            setForm(EMPTY_FORM);
            setModal(false);
            setFeedback({ type: "success", msg: "Quotation created as Draft." });
        } catch {
            setFeedback({ type: "error", msg: "Something went wrong." });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: Quotation["status"]) => {
        if (!user?.uid) return;
        try {
            await quotationsService.update(user.uid, id, { status });
            setFeedback({ type: "success", msg: `Quote marked as ${status}.` });
        } catch {
            setFeedback({ type: "error", msg: "Update failed." });
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Feedback */}
            <AnimatePresence>
                {feedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setFeedback(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative bg-white rounded-3xl p-8 text-center max-w-sm w-full z-10 border border-zinc-200 shadow-2xl">
                            {feedback.type === "success" ? <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" /> : <XCircle size={40} className="text-red-500 mx-auto mb-4" />}
                            <p className="text-sm font-semibold text-zinc-900 mb-4">{feedback.msg}</p>
                            <button onClick={() => setFeedback(null)} className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold">Done</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Create Modal */}
            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-md z-10 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                                <h3 className="text-base font-bold text-zinc-900">New Quotation</h3>
                                <button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100"><X size={16} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { label: "Client / Company *", key: "clientName", placeholder: "Client name" },
                                    { label: "Number of Items", key: "items", placeholder: "1", type: "number" },
                                    { label: "Total Amount (₦) *", key: "totalAmount", placeholder: "0.00", type: "number" },
                                    { label: "Valid for (days)", key: "validDays", placeholder: "30", type: "number" },
                                    { label: "Notes", key: "notes", placeholder: "Additional terms or notes..." },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{label}</label>
                                        <input type={type || "text"} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-red-300"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 border-t border-zinc-100 flex gap-3">
                                <button onClick={() => setModal(false)} className="flex-1 btn-ghost text-sm">Cancel</button>
                                <button onClick={handleSave} disabled={saving || !form.clientName || !form.totalAmount} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Create Quote"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Quotations</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Generate quotes and track approvals</p>
                </div>
                <button onClick={() => setModal(true)} className="btn-primary text-sm"><Plus size={15} /> Create Quote</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {loading ? [...Array(4)].map((_, i) => (
                    <div key={i} className="card p-4 animate-pulse h-20"><div className="h-3 bg-zinc-100 rounded w-1/2 mb-2" /><div className="h-6 bg-zinc-100 rounded w-3/4" /></div>
                )) : [
                    { label: "Total Quotes", value: String(quotations.length), icon: FileText },
                    { label: "Accepted Value", value: `₦${(totalAccepted / 1000).toFixed(0)}K`, icon: CheckCircle2 },
                    { label: "Awaiting Reply", value: String(pending), icon: Clock },
                    { label: "Conversion Rate", value: `${conversionRate}%`, icon: TrendingUp },
                ].map(s => (
                    <div key={s.label} className="card p-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400"><s.icon size={15} /></div>
                        <div><p className="text-[11px] text-zinc-400">{s.label}</p><p className="text-xl font-bold text-zinc-900">{s.value}</p></div>
                    </div>
                ))}
            </div>

            {/* Search + Table */}
            <div className="card overflow-hidden">
                <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center gap-3">
                    <Search size={14} className="text-zinc-400 shrink-0" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by client name..."
                        className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-50">
                                {["Quote #", "Client", "Amount", "Items", "Status", "Actions"].map(h => (
                                    <th key={h} className="px-5 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-16 text-center">
                                        <FileSearch size={32} className="text-zinc-200 mx-auto mb-3" />
                                        <p className="text-sm text-zinc-400">{search ? "No quotations match your search." : "No quotations yet."}</p>
                                        {!search && <button onClick={() => setModal(true)} className="mt-3 text-xs font-bold text-red-600 hover:underline">+ Create your first quote</button>}
                                    </td>
                                </tr>
                            ) : filtered.map((q) => (
                                <tr key={q.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                    <td className="px-5 py-3.5 text-[12px] font-mono text-zinc-500">
                                        QT-{q.id?.slice(-4).toUpperCase()}
                                    </td>
                                    <td className="px-5 py-3.5 text-[13px] font-semibold text-zinc-900">{q.clientName}</td>
                                    <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-900">₦{q.totalAmount?.toLocaleString()}</td>
                                    <td className="px-5 py-3.5 text-[13px] text-zinc-500">{q.items}</td>
                                    <td className="px-5 py-3.5"><span className={cn("badge", STATUS_BADGE[q.status ?? "Draft"] ?? "badge-neutral")}>{q.status}</span></td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-1">
                                            {q.status === "Draft" && q.id && (
                                                <button onClick={() => handleUpdateStatus(q.id!, "Sent")} className="text-[11px] font-semibold text-zinc-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all flex items-center gap-1">
                                                    <Send size={11} /> Send
                                                </button>
                                            )}
                                            {q.status === "Sent" && q.id && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(q.id!, "Accepted")} className="text-[11px] font-semibold text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all">Accept</button>
                                                    <button onClick={() => handleUpdateStatus(q.id!, "Rejected")} className="text-[11px] font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg transition-all">Reject</button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
