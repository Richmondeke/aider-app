"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Globe, Clock, MapPin, Save, Loader2, CheckCircle2, XCircle, Edit2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/lib/firebase/service";

const CATEGORIES = [
    "Retail & Supermarket", "Pharmacy & Healthcare", "Electronics Store",
    "Restaurant & Cafe", "Fashion & Clothing", "Auto Parts", "Agriculture",
    "Construction & Hardware", "Books & Stationery", "Other"
];
const CURRENCIES = ["NGN (₦)", "USD ($)", "GBP (£)", "EUR (€)", "GHS (₵)", "KES (KSh)"];
const TIMEZONES = ["Africa/Lagos", "Africa/Nairobi", "Europe/London", "America/New_York", "America/Los_Angeles"];

type Feedback = { type: "success" | "error"; msg: string } | null;

export default function BusinessPage() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);

    const [form, setForm] = useState({
        businessName: "",
        businessCategory: "Retail & Supermarket",
        businessAddress: "",
        businessCity: "",
        businessCountry: "Nigeria",
        website: "",
        rcNumber: "",
        taxId: "",
        currency: "NGN (₦)",
        timezone: "Africa/Lagos",
    });

    useEffect(() => {
        if (!user?.uid) return;
        userService.get(user.uid).then((data) => {
            if (data) {
                const d = data as Record<string, string>;
                setForm(prev => ({
                    ...prev,
                    businessName: d.businessName || "",
                    businessCategory: d.businessCategory || "Retail & Supermarket",
                    businessAddress: d.businessAddress || "",
                    businessCity: d.businessCity || "",
                    businessCountry: d.businessCountry || "Nigeria",
                    website: d.website || "",
                    rcNumber: d.rcNumber || "",
                    taxId: d.taxId || "",
                    currency: d.currency || "NGN (₦)",
                    timezone: d.timezone || "Africa/Lagos",
                }));
            }
            setLoading(false);
        });
    }, [user]);

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            await userService.set(user.uid, { ...form });
            setEditing(false);
            setFeedback({ type: "success", msg: "Business details saved." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to save. Try again." });
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

            {/* Business Identity */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500"><Store size={15} /></div>
                        <h3 className="text-sm font-bold text-zinc-900">Business Identity</h3>
                    </div>
                    {!editing
                        ? <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all"><Edit2 size={12} /> Edit</button>
                        : <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-all"><X size={12} /> Cancel</button>}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                        {[...Array(6)].map((_, i) => <div key={i}><div className="h-2.5 bg-zinc-100 rounded w-1/3 mb-2" /><div className="h-10 bg-zinc-100 rounded-lg" /></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Registered Business Name", key: "businessName", placeholder: "e.g. Aider Solutions Ltd" },
                            { label: "RC Number", key: "rcNumber", placeholder: "e.g. RC-1234567" },
                            { label: "Business Address", key: "businessAddress", placeholder: "Street address" },
                            { label: "City", key: "businessCity", placeholder: "Lagos" },
                            { label: "Website", key: "website", placeholder: "https://yourstore.com" },
                            { label: "Tax ID / TIN", key: "taxId", placeholder: "e.g. 1234567-0001" },
                        ].map(({ label, key, placeholder }) => (
                            <div key={key}>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{label}</label>
                                <input type="text" readOnly={!editing} placeholder={placeholder} value={form[key as keyof typeof form]}
                                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`}
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Business Category</label>
                            <select disabled={!editing} value={form.businessCategory} onChange={e => setForm(prev => ({ ...prev, businessCategory: e.target.value }))}
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"}`}>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Regional */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400"><Globe size={15} /></div>
                        <h3 className="text-sm font-bold text-zinc-900">Regional Settings</h3>
                    </div>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                        {[...Array(2)].map((_, i) => <div key={i}><div className="h-2.5 bg-zinc-100 rounded w-1/3 mb-2" /><div className="h-10 bg-zinc-100 rounded-lg" /></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Default Currency</label>
                            <select disabled={!editing} value={form.currency} onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))}
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300"}`}>
                                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Timezone</label>
                            <select disabled={!editing} value={form.timezone} onChange={e => setForm(prev => ({ ...prev, timezone: e.target.value }))}
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300"}`}>
                                {TIMEZONES.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {editing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <button onClick={handleSave} disabled={saving} className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all">
                        {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Business Details</>}
                    </button>
                </motion.div>
            )}
        </div>
    );
}
