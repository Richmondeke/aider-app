"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Save, Loader2, CheckCircle2, XCircle, Edit2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/lib/firebase/service";

type Feedback = { type: "success" | "error"; msg: string } | null;

const VAT_RATES = ["0%", "5%", "7.5%", "10%", "15%", "20%"];
const TAX_TYPES = ["VAT", "Sales Tax", "GST", "HST", "None"];

export default function TaxPage() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);

    const [form, setForm] = useState({
        taxEnabled: false,
        taxType: "VAT",
        taxRate: "7.5%",
        taxId: "",
        taxName: "VAT",
        showTaxOnReceipt: true,
        taxIncludedInPrice: false,
    });

    useEffect(() => {
        if (!user?.uid) return;
        userService.get(user.uid).then((data) => {
            if (data && (data as Record<string, unknown>).taxSettings) {
                setForm(prev => ({ ...prev, ...(data as Record<string, unknown>).taxSettings as typeof form }));
            }
            setLoading(false);
        });
    }, [user]);

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            await userService.set(user.uid, { taxSettings: form });
            setEditing(false);
            setFeedback({ type: "success", msg: "Tax settings saved." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to save tax settings." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-5">
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

            {/* Tax Config Card */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400"><Receipt size={15} /></div>
                        <h3 className="text-sm font-bold text-zinc-900">Tax Configuration</h3>
                    </div>
                    {!editing
                        ? <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all"><Edit2 size={12} /> Edit</button>
                        : <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-all"><X size={12} /> Cancel</button>}
                </div>

                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[...Array(5)].map((_, i) => <div key={i}><div className="h-2.5 bg-zinc-100 rounded w-1/3 mb-2" /><div className="h-10 bg-zinc-100 rounded-lg" /></div>)}
                    </div>
                ) : (
                    <div className="space-y-5">
                        {/* Enable Tax Toggle */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="text-sm font-semibold text-zinc-800">Enable Tax Collection</p>
                                <p className="text-[11px] text-zinc-400 mt-0.5">Apply tax to all sales transactions</p>
                            </div>
                            <button
                                disabled={!editing}
                                onClick={() => setForm(prev => ({ ...prev, taxEnabled: !prev.taxEnabled }))}
                                className={`relative w-11 h-6 rounded-full transition-all duration-200 ${form.taxEnabled ? "bg-red-600" : "bg-zinc-200"} disabled:opacity-60`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${form.taxEnabled ? "left-6" : "left-1"}`} />
                            </button>
                        </div>

                        {form.taxEnabled && (
                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tax Type</label>
                                    <select disabled={!editing} value={form.taxType} onChange={e => setForm(prev => ({ ...prev, taxType: e.target.value }))}
                                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`}>
                                        {TAX_TYPES.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tax Rate</label>
                                    <select disabled={!editing} value={form.taxRate} onChange={e => setForm(prev => ({ ...prev, taxRate: e.target.value }))}
                                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`}>
                                        {VAT_RATES.map(r => <option key={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tax Name on Receipt</label>
                                    <input type="text" readOnly={!editing} value={form.taxName} placeholder="e.g. VAT" onChange={e => setForm(prev => ({ ...prev, taxName: e.target.value }))}
                                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tax Reg. Number</label>
                                    <input type="text" readOnly={!editing} value={form.taxId} placeholder="e.g. TIN-12345" onChange={e => setForm(prev => ({ ...prev, taxId: e.target.value }))}
                                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`} />
                                </div>

                                {/* Toggles */}
                                {[
                                    { key: "showTaxOnReceipt", label: "Show Tax on Receipts", desc: "Display tax line item on all receipts" },
                                    { key: "taxIncludedInPrice", label: "Tax Included in Price", desc: "Product prices already include tax" },
                                ].map(({ key, label, desc }) => (
                                    <div key={key} className="col-span-full flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-800">{label}</p>
                                            <p className="text-[11px] text-zinc-400 mt-0.5">{desc}</p>
                                        </div>
                                        <button disabled={!editing}
                                            onClick={() => setForm(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                                            className={`relative w-11 h-6 rounded-full transition-all duration-200 ${form[key as keyof typeof form] ? "bg-red-600" : "bg-zinc-200"} disabled:opacity-60`}>
                                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${form[key as keyof typeof form] ? "left-6" : "left-1"}`} />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                )}

                {editing && (
                    <div className="mt-5 pt-5 border-t border-zinc-100 flex justify-end">
                        <button onClick={handleSave} disabled={saving} className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all">
                            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Tax Settings</>}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
