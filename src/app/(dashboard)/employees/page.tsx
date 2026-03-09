"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Trash2, Users, UserX,
    X, Loader2, CheckCircle2, XCircle, Mail, Phone, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { employeesService } from "@/lib/firebase/service";
import type { Employee } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

const ACCESS_LEVELS = ["Full Admin", "POS Only", "Sales + History", "Full History", "Read Only"];
const DEPARTMENTS = ["Management", "Sales", "Finance", "Operations", "Customer Service", "Logistics"];

function SkeletonCard() {
    return (
        <div className="card p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl" />
                <div className="space-y-2"><div className="h-3.5 bg-zinc-100 rounded w-28" /><div className="h-2.5 bg-zinc-100 rounded w-20" /></div>
            </div>
            <div className="space-y-2"><div className="h-2.5 bg-zinc-100 rounded" /><div className="h-2.5 bg-zinc-100 rounded w-3/4" /></div>
        </div>
    );
}

const EMPTY_FORM = { name: "", role: "", email: "", phone: "", department: "", accessLevel: "POS Only" };

export default function EmployeesPage() {
    const { user } = useAuth();
    const { data: employees, loading } = useFirestoreCollection<Employee>("employees", [orderBy("name")]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const filtered = employees.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) || e.role?.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = async () => {
        if (!user?.uid || !form.name) return;
        setSaving(true);
        try {
            await employeesService.add(user.uid, { ...form, status: "Active" });
            setForm(EMPTY_FORM);
            setModal(false);
            setFeedback({ type: "success", msg: "Employee added successfully." });
        } catch {
            setFeedback({ type: "error", msg: "Something went wrong." });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user?.uid || !confirm("Remove this employee?")) return;
        try {
            await employeesService.remove(user.uid, id);
            setFeedback({ type: "success", msg: "Employee removed." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to remove." });
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

            {/* Add Modal */}
            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-md z-10 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                                <h3 className="text-base font-bold text-zinc-900">Add Employee</h3>
                                <button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 transition-all"><X size={16} /></button>
                            </div>
                            <div className="p-6 space-y-4 overflow-y-auto max-h-[65vh]">
                                {[
                                    { label: "Full Name *", key: "name", placeholder: "e.g. John Adebayo" },
                                    { label: "Role / Title", key: "role", placeholder: "e.g. Cashier" },
                                    { label: "Email", key: "email", placeholder: "john@yourstore.com" },
                                    { label: "Phone", key: "phone", placeholder: "+234 800 000 0000" },
                                ].map(({ label, key, placeholder }) => (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{label}</label>
                                        <input type="text" placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-red-300"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Department</label>
                                    <select value={form.department} onChange={e => setForm(prev => ({ ...prev, department: e.target.value }))}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none"
                                    >
                                        <option value="">Select department</option>
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Access Level</label>
                                    <select value={form.accessLevel} onChange={e => setForm(prev => ({ ...prev, accessLevel: e.target.value }))}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none"
                                    >
                                        {ACCESS_LEVELS.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-zinc-100 flex gap-3">
                                <button onClick={() => setModal(false)} className="flex-1 btn-ghost text-sm">Cancel</button>
                                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Add Employee"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Team Directory</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Manage staff accounts and access permissions</p>
                </div>
                <button onClick={() => setModal(true)} className="btn-primary text-sm"><Plus size={15} /> Add Employee</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {loading ? [...Array(3)].map((_, i) => (
                    <div key={i} className="card p-4 animate-pulse h-20"><div className="h-3 bg-zinc-100 rounded w-1/2 mb-2" /><div className="h-6 bg-zinc-100 rounded w-1/4" /></div>
                )) : [
                    { label: "Total Staff", value: employees.length, icon: Users },
                    { label: "Active", value: employees.filter(e => e.status === "Active").length, icon: CheckCircle2 },
                    { label: "Departments", value: new Set(employees.map(e => e.department).filter(Boolean)).size, icon: Shield },
                ].map(s => (
                    <div key={s.label} className="card p-4 flex items-center gap-3">
                        <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-400"><s.icon size={16} /></div>
                        <div><p className="text-[11px] text-zinc-400">{s.label}</p><p className="text-xl font-bold text-zinc-900">{s.value}</p></div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..."
                    className="w-full bg-white border border-zinc-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : filtered.length === 0 ? (
                <div className="card p-16 text-center">
                    <UserX size={36} className="text-zinc-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-zinc-500">{search ? "No employees match your search." : "No team members added yet."}</p>
                    {!search && <button onClick={() => setModal(true)} className="mt-3 text-xs font-bold text-red-600 hover:underline">+ Add your first employee</button>}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(emp => (
                        <motion.div key={emp.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-5 group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-zinc-100 rounded-2xl flex items-center justify-center text-base font-bold text-zinc-600">
                                        {emp.name[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900">{emp.name}</p>
                                        <p className="text-[11px] text-zinc-400">{emp.role}</p>
                                    </div>
                                </div>
                                <button onClick={() => emp.id && handleDelete(emp.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                            <div className="space-y-1.5 mb-3">
                                {emp.email && <div className="flex items-center gap-2 text-[12px] text-zinc-500"><Mail size={11} />{emp.email}</div>}
                                {emp.phone && <div className="flex items-center gap-2 text-[12px] text-zinc-500"><Phone size={11} />{emp.phone}</div>}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                                <span className="text-[11px] text-zinc-400">{emp.department}</span>
                                <span className={cn("badge", emp.accessLevel === "Full Admin" ? "badge-danger" : "badge-neutral")}>{emp.accessLevel}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
