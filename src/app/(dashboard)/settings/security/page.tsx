"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Key, Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";

type Feedback = { type: "success" | "error"; msg: string } | null;

export default function SecurityPage() {
    const { user } = useAuth();
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [saving, setSaving] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChangePassword = async () => {
        if (!user) return;
        if (form.newPassword.length < 8) {
            setFeedback({ type: "error", msg: "New password must be at least 8 characters." });
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setFeedback({ type: "error", msg: "Passwords do not match." });
            return;
        }
        setSaving(true);
        try {
            const credential = EmailAuthProvider.credential(user.email!, form.currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, form.newPassword);
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setFeedback({ type: "success", msg: "Password updated successfully." });
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code;
            if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
                setFeedback({ type: "error", msg: "Current password is incorrect." });
            } else {
                setFeedback({ type: "error", msg: "Failed to update password. Please try again." });
            }
        } finally {
            setSaving(false);
        }
    };

    const strength = (() => {
        const p = form.newPassword;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"][strength];

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

            {/* Account Info */}
            <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-zinc-100">
                    <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400"><Shield size={15} /></div>
                    <h3 className="text-sm font-bold text-zinc-900">Account Security</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Key size={14} className="text-zinc-400" />
                            <div>
                                <p className="text-xs font-semibold text-zinc-700">Email / Password Login</p>
                                <p className="text-[11px] text-zinc-400">{user?.email}</p>
                            </div>
                        </div>
                        <span className="badge badge-success text-[10px]">Active</span>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-zinc-100">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500"><Lock size={15} /></div>
                    <h3 className="text-sm font-bold text-zinc-900">Change Password</h3>
                </div>

                <div className="space-y-4 max-w-md">
                    {[
                        { label: "Current Password", key: "currentPassword", show: showCurrent, toggle: () => setShowCurrent(v => !v) },
                        { label: "New Password", key: "newPassword", show: showNew, toggle: () => setShowNew(v => !v) },
                        { label: "Confirm New Password", key: "confirmPassword", show: showConfirm, toggle: () => setShowConfirm(v => !v) },
                    ].map(({ label, key, show, toggle }) => (
                        <div key={key}>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{label}</label>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    value={form[key as keyof typeof form]}
                                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 outline-none pr-10 focus:border-red-400 focus:bg-white transition-all"
                                />
                                <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Strength indicator */}
                    {form.newPassword && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-zinc-100"}`} />
                                ))}
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-1">{strengthLabel} password</p>
                        </motion.div>
                    )}

                    <button
                        onClick={handleChangePassword}
                        disabled={saving || !form.currentPassword || !form.newPassword}
                        className="w-full bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                    >
                        {saving ? <><Loader2 size={14} className="animate-spin" /> Updating...</> : "Update Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}
