"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Save, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/lib/firebase/service";

type Feedback = { type: "success" | "error"; msg: string } | null;

interface NotificationPrefs {
    newSale: boolean;
    lowStock: boolean;
    paymentReceived: boolean;
    dailySummary: boolean;
    weeklySummary: boolean;
    securityAlerts: boolean;
    promotions: boolean;
}

const NOTIFICATION_ITEMS: { key: keyof NotificationPrefs; label: string; desc: string }[] = [
    { key: "newSale", label: "New Sale", desc: "Alert whenever a new sale is completed" },
    { key: "lowStock", label: "Low Stock Alert", desc: "Notify when a product falls below its threshold" },
    { key: "paymentReceived", label: "Payment Received", desc: "Alert when a payment or transfer is received" },
    { key: "dailySummary", label: "Daily Summary", desc: "End-of-day sales and inventory summary" },
    { key: "weeklySummary", label: "Weekly Report", desc: "Weekly business performance digest" },
    { key: "securityAlerts", label: "Security Alerts", desc: "Login and suspicious activity notifications" },
    { key: "promotions", label: "Product Updates", desc: "New features, tips, and platform updates" },
];

const DEFAULT_PREFS: NotificationPrefs = {
    newSale: true,
    lowStock: true,
    paymentReceived: true,
    dailySummary: false,
    weeklySummary: false,
    securityAlerts: true,
    promotions: false,
};

export default function NotificationsPage() {
    const { user } = useAuth();
    const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);

    useEffect(() => {
        if (!user?.uid) return;
        userService.get(user.uid).then((data) => {
            if (data && (data as Record<string, unknown>).notificationPrefs) {
                setPrefs((data as Record<string, unknown>).notificationPrefs as NotificationPrefs);
            }
            setLoading(false);
        });
    }, [user]);

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            await userService.set(user.uid, { notificationPrefs: prefs });
            setFeedback({ type: "success", msg: "Notification preferences saved." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to save preferences." });
        } finally {
            setSaving(false);
        }
    };

    const toggle = (key: keyof NotificationPrefs) => {
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
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

            <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-zinc-100">
                    <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400"><Bell size={15} /></div>
                    <h3 className="text-sm font-bold text-zinc-900">Notification Preferences</h3>
                </div>

                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                                <div className="space-y-1.5"><div className="h-3 bg-zinc-100 rounded w-32" /><div className="h-2.5 bg-zinc-100 rounded w-48" /></div>
                                <div className="w-10 h-6 bg-zinc-100 rounded-full" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="divide-y divide-zinc-50">
                        {NOTIFICATION_ITEMS.map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center justify-between py-3.5">
                                <div>
                                    <p className="text-sm font-semibold text-zinc-800">{label}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{desc}</p>
                                </div>
                                <button
                                    onClick={() => toggle(key)}
                                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${prefs[key] ? "bg-red-600" : "bg-zinc-200"}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${prefs[key] ? "left-6" : "left-1"}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-5 pt-5 border-t border-zinc-100 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                    >
                        {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Preferences</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
