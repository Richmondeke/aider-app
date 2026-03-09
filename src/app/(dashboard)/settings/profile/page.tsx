"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Save, CheckCircle2, XCircle, Loader2, Edit2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/lib/firebase/service";

type FeedbackType = "success" | "error" | null;

const COUNTRIES = [
    "Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom",
    "United States", "Canada", "Germany", "France", "India", "Other"
];

export default function ProfilePage() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: FeedbackType; msg: string } | null>(null);

    const [form, setForm] = useState({
        displayName: "",
        email: "",
        phone: "",
        country: "Nigeria",
        role: "Store Owner",
    });

    // Load saved profile from Firestore
    useEffect(() => {
        if (!user?.uid) return;
        userService.get(user.uid).then((data) => {
            if (data) {
                setForm({
                    displayName: (data as Record<string, string>).displayName || user.displayName || "",
                    email: (data as Record<string, string>).email || user.email || "",
                    phone: (data as Record<string, string>).phone || "",
                    country: (data as Record<string, string>).country || "Nigeria",
                    role: (data as Record<string, string>).role || "Store Owner",
                });
            } else {
                setForm(prev => ({
                    ...prev,
                    displayName: user.displayName || "",
                    email: user.email || "",
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
            setFeedback({ type: "success", msg: "Profile updated successfully." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to save. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    const initials = form.displayName
        ? form.displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    return (
        <div className="space-y-5">
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

            {/* Avatar + Header */}
            <div className="card p-6">
                {loading ? (
                    <div className="flex items-center gap-5 animate-pulse">
                        <div className="w-20 h-20 bg-zinc-100 rounded-2xl" />
                        <div className="space-y-3"><div className="h-5 bg-zinc-100 rounded w-40" /><div className="h-3 bg-zinc-100 rounded w-28" /></div>
                    </div>
                ) : (
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-20 h-20 bg-zinc-100 rounded-2xl flex items-center justify-center text-2xl font-black text-zinc-600 border-2 border-zinc-200">
                                {initials}
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-red-700 transition-all">
                                <Camera size={13} />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900">{form.displayName || "—"}</h2>
                            <p className="text-xs text-zinc-400 mt-0.5 uppercase tracking-widest">{form.role} · Premium Member</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs text-zinc-500">{form.email}</span>
                                {form.phone && <span className="text-xs text-zinc-500">{form.phone}</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Personal Information */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900">Personal Information</h3>
                    {!editing ? (
                        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all">
                            <Edit2 size={12} /> Edit Profile
                        </button>
                    ) : (
                        <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-all">
                            <X size={12} /> Cancel
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i}>
                                <div className="h-2.5 bg-zinc-100 rounded w-1/3 mb-2" />
                                <div className="h-10 bg-zinc-100 rounded-lg" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", key: "displayName", placeholder: "Your full name" },
                            { label: "Email Address", key: "email", placeholder: "you@example.com", readOnly: true },
                            { label: "Phone Number", key: "phone", placeholder: "+234 800 000 0000" },
                            { label: "Role / Title", key: "role", placeholder: "Store Owner" },
                        ].map(({ label, key, placeholder, readOnly }) => (
                            <div key={key}>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{label}</label>
                                <input
                                    type="text"
                                    readOnly={!editing || readOnly}
                                    placeholder={placeholder}
                                    value={form[key as keyof typeof form]}
                                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing || readOnly ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"
                                        } ${readOnly ? "text-zinc-400" : ""}`}
                                />
                                {readOnly && <p className="text-[10px] text-zinc-400 mt-1">Email cannot be changed here</p>}
                            </div>
                        ))}

                        {/* Country */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Country</label>
                            <select
                                disabled={!editing}
                                value={form.country}
                                onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))}
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none transition-all ${!editing ? "bg-zinc-50 border-zinc-100 cursor-default" : "bg-white border-zinc-300 focus:border-red-400"
                                    }`}
                            >
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {editing && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-5 border-t border-zinc-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                        >
                            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Profile Changes</>}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
