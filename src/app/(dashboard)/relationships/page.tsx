"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Edit2, Trash2, Users, UserX,
    X, Loader2, CheckCircle2, XCircle, Mail, Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { customersService, suppliersService } from "@/lib/firebase/service";
import type { Customer, Supplier } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

type Tab = "customers" | "suppliers";
type FeedbackType = "success" | "error" | null;

function SkeletonCard() {
    return (
        <div className="card p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl" />
                <div className="space-y-2 flex-1"><div className="h-3.5 bg-zinc-100 rounded w-1/2" /><div className="h-2.5 bg-zinc-100 rounded w-1/3" /></div>
            </div>
            <div className="space-y-2"><div className="h-2.5 bg-zinc-100 rounded w-3/4" /><div className="h-2.5 bg-zinc-100 rounded w-2/3" /></div>
        </div>
    );
}

export default function RelationshipsPage() {
    const { user } = useAuth();
    const [tab, setTab] = useState<Tab>("customers");
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: FeedbackType; msg: string } | null>(null);
    const [cForm, setCForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [sForm, setSForm] = useState({ name: "", email: "", phone: "", address: "" });

    const { data: customers, loading: cLoading } = useFirestoreCollection<Customer>("customers", [orderBy("name")]);
    const { data: suppliers, loading: sLoading } = useFirestoreCollection<Supplier>("suppliers", [orderBy("name")]);

    const loading = tab === "customers" ? cLoading : sLoading;
    const items = (tab === "customers" ? customers : suppliers).filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = async () => {
        if (!user?.uid) return;
        const f = tab === "customers" ? cForm : sForm;
        if (!f.name) return;
        setSaving(true);
        try {
            if (tab === "customers") {
                await customersService.add(user.uid, { ...cForm, totalPurchases: 0, totalSpent: 0 });
                setCForm({ name: "", email: "", phone: "", address: "" });
            } else {
                await suppliersService.add(user.uid, sForm);
                setSForm({ name: "", email: "", phone: "", address: "" });
            }
            setModal(false);
            setFeedback({ type: "success", msg: `${tab === "customers" ? "Customer" : "Supplier"} added successfully.` });
        } catch {
            setFeedback({ type: "error", msg: "Something went wrong. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user?.uid || !confirm("Delete this record?")) return;
        try {
            if (tab === "customers") await customersService.remove(user.uid, id);
            else await suppliersService.remove(user.uid, id);
            setFeedback({ type: "success", msg: "Record deleted." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to delete." });
        }
    };

    const f = tab === "customers" ? cForm : sForm;
    const setF = tab === "customers" ? setCForm : setSForm;

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

            {/* Add Modal */}
            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-md z-10 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                                <h3 className="text-base font-bold text-zinc-900">Add {tab === "customers" ? "Customer" : "Supplier"}</h3>
                                <button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 transition-all"><X size={16} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { label: "Name *", key: "name", placeholder: "Full name" },
                                    { label: "Email", key: "email", placeholder: "email@example.com" },
                                    { label: "Phone", key: "phone", placeholder: "+234 800 000 0000" },
                                    { label: "Address", key: "address", placeholder: "Street, City" },
                                ].map(({ label, key, placeholder }) => (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{label}</label>
                                        <input type="text" placeholder={placeholder} value={f[key as keyof typeof f]} onChange={e => setF(prev => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-red-300"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 border-t border-zinc-100 flex gap-3">
                                <button onClick={() => setModal(false)} className="flex-1 btn-ghost text-sm">Cancel</button>
                                <button onClick={handleSave} disabled={saving || !f.name} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Add Record"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Relationships</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Manage customers and suppliers</p>
                </div>
                <button onClick={() => setModal(true)} className="btn-primary text-sm"><Plus size={15} /> Add {tab === "customers" ? "Customer" : "Supplier"}</button>
            </div>

            {/* Tabs + Search */}
            <div className="flex items-center gap-3">
                {(["customers", "suppliers"] as Tab[]).map(t => (
                    <button key={t} onClick={() => setTab(t)} className={cn(
                        "px-4 py-2 rounded-lg text-xs font-semibold transition-all border capitalize",
                        tab === t ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                    )}>
                        {t}
                    </button>
                ))}
                <div className="flex-1 relative ml-2">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab}...`}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                    />
                </div>
            </div>

            {/* Cards Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : items.length === 0 ? (
                <div className="card p-16 text-center">
                    <UserX size={36} className="text-zinc-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-zinc-500">{search ? `No ${tab} match your search.` : `No ${tab} added yet.`}</p>
                    {!search && <button onClick={() => setModal(true)} className="mt-3 text-xs font-bold text-red-600 hover:underline">+ Add your first {tab === "customers" ? "customer" : "supplier"}</button>}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-5 group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-sm font-bold text-zinc-600">
                                        {item.name[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                                        {tab === "customers" && <p className="text-[11px] text-zinc-400">{(item as Customer).totalPurchases} purchases</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => item.id && handleDelete(item.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={13} /></button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                {item.email && (
                                    <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                                        <Mail size={12} className="shrink-0" /> {item.email}
                                    </div>
                                )}
                                {item.phone && (
                                    <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                                        <Phone size={12} className="shrink-0" /> {item.phone}
                                    </div>
                                )}
                                {tab === "customers" && (item as Customer).totalSpent > 0 && (
                                    <p className="text-xs font-bold text-emerald-600 pt-1">₦{(item as Customer).totalSpent.toLocaleString()} total spent</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && <p className="text-[11px] text-zinc-400">{items.length} {tab} total</p>}
        </div>
    );
}
