"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Filter, Download, Edit2, Trash2, Package,
    Boxes, AlertTriangle, X, Loader2, CheckCircle2, XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { productsService } from "@/lib/firebase/service";
import type { Product } from "@/lib/firebase/service";
import { orderBy } from "firebase/firestore";

type FeedbackType = "success" | "error" | null;
type ModalMode = "add" | "edit" | null;

const statusBadge: Record<string, string> = {
    "In Stock": "badge-success",
    "Low Stock": "badge-warning",
    "Out of Stock": "badge-danger",
};

function StatusBadge({ status }: { status: string }) {
    return <span className={cn("badge", statusBadge[status] ?? "badge-neutral")}>{status}</span>;
}

function SkeletonRow() {
    return (
        <tr className="animate-pulse border-b border-zinc-50">
            {[...Array(7)].map((_, i) => (
                <td key={i} className="px-5 py-4"><div className="h-3.5 bg-zinc-100 rounded w-3/4" /></td>
            ))}
        </tr>
    );
}

const EMPTY_FORM = { name: "", sku: "", category: "", price: "", costPrice: "", stock: "", lowStockThreshold: "" };

export default function ProductsPage() {
    const { user } = useAuth();
    const { data: products, loading } = useFirestoreCollection<Product>("products", [orderBy("createdAt", "desc")]);

    const [search, setSearch] = useState("");
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editTarget, setEditTarget] = useState<Product | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: FeedbackType; msg: string } | null>(null);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => { setForm(EMPTY_FORM); setEditTarget(null); setModalMode("add"); };
    const openEdit = (p: Product) => {
        setForm({ name: p.name, sku: p.sku ?? "", category: p.category, price: String(p.price), costPrice: String(p.costPrice ?? ""), stock: String(p.stock), lowStockThreshold: String(p.lowStockThreshold ?? 5) });
        setEditTarget(p);
        setModalMode("edit");
    };

    const computeStatus = (stock: number, threshold: number): Product["status"] => {
        if (stock === 0) return "Out of Stock";
        if (stock <= threshold) return "Low Stock";
        return "In Stock";
    };

    const handleSave = async () => {
        if (!user?.uid || !form.name || !form.price) return;
        setSaving(true);
        try {
            const stock = Number(form.stock) || 0;
            const threshold = Number(form.lowStockThreshold) || 5;
            const data = {
                name: form.name,
                sku: form.sku || `SKU-${Date.now()}`,
                category: form.category || "General",
                price: Number(form.price),
                costPrice: Number(form.costPrice) || 0,
                stock,
                lowStockThreshold: threshold,
                status: computeStatus(stock, threshold),
            };
            if (modalMode === "edit" && editTarget?.id) {
                await productsService.update(user.uid, editTarget.id, data);
            } else {
                await productsService.add(user.uid, data);
            }
            setModalMode(null);
            setFeedback({ type: "success", msg: modalMode === "edit" ? "Product updated." : "Product added." });
        } catch {
            setFeedback({ type: "error", msg: "Something went wrong. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user?.uid || !confirm("Delete this product permanently?")) return;
        try {
            await productsService.remove(user.uid, id);
            setFeedback({ type: "success", msg: "Product deleted." });
        } catch {
            setFeedback({ type: "error", msg: "Failed to delete." });
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Feedback Modal */}
            <AnimatePresence>
                {feedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setFeedback(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white rounded-3xl p-8 text-center max-w-sm w-full z-10 border border-zinc-200 shadow-2xl">
                            {feedback.type === "success"
                                ? <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                                : <XCircle size={40} className="text-red-500 mx-auto mb-4" />}
                            <p className="text-sm font-semibold text-zinc-900 mb-4">{feedback.msg}</p>
                            <button onClick={() => setFeedback(null)} className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold">Done</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {modalMode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" onClick={() => setModalMode(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-lg z-10 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                                <h3 className="text-base font-bold text-zinc-900">{modalMode === "add" ? "Add New Product" : "Edit Product"}</h3>
                                <button onClick={() => setModalMode(null)} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 transition-all"><X size={16} /></button>
                            </div>
                            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                                {[
                                    { label: "Product Name *", key: "name", placeholder: "e.g. Wireless Headset" },
                                    { label: "SKU / Barcode", key: "sku", placeholder: "Auto-generated if empty" },
                                    { label: "Category", key: "category", placeholder: "e.g. Electronics" },
                                    { label: "Selling Price (₦) *", key: "price", placeholder: "0.00", type: "number" },
                                    { label: "Cost Price (₦)", key: "costPrice", placeholder: "0.00", type: "number" },
                                    { label: "Stock Quantity", key: "stock", placeholder: "0", type: "number" },
                                    { label: "Low Stock Threshold", key: "lowStockThreshold", placeholder: "5", type: "number" },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{label}</label>
                                        <input
                                            type={type || "text"}
                                            placeholder={placeholder}
                                            value={form[key as keyof typeof form]}
                                            onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-red-300"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 border-t border-zinc-100 flex gap-3">
                                <button onClick={() => setModalMode(null)} className="flex-1 btn-ghost text-sm">Cancel</button>
                                <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : (modalMode === "add" ? "Add Product" : "Save Changes")}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Manage your inventory catalogue</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn-ghost text-sm"><Download size={15} /> Export</button>
                    <button onClick={openAdd} className="btn-primary text-sm"><Plus size={15} /> Add Product</button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {loading ? [...Array(4)].map((_, i) => (
                    <div key={i} className="card p-4 animate-pulse h-20"><div className="h-3 bg-zinc-100 rounded w-1/2 mb-2" /><div className="h-6 bg-zinc-100 rounded w-3/4" /></div>
                )) : [
                    { label: "Total Products", value: products.length, icon: Package },
                    { label: "In Stock", value: products.filter(p => p.status === "In Stock").length, icon: Boxes },
                    { label: "Low Stock", value: products.filter(p => p.status === "Low Stock").length, icon: AlertTriangle },
                    { label: "Out of Stock", value: products.filter(p => p.status === "Out of Stock").length, icon: XCircle },
                ].map(s => (
                    <div key={s.label} className="card p-4">
                        <p className="text-[11px] font-medium text-zinc-400">{s.label}</p>
                        <p className="text-2xl font-bold text-zinc-900 mt-1">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="card p-4 flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400" />
                </div>
                <button className="btn-ghost text-sm"><Filter size={14} /> Filters</button>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-50">
                                {["Name", "SKU", "Category", "Price", "Stock", "Status", ""].map(h => (
                                    <th key={h} className="px-5 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center">
                                        <Package size={32} className="text-zinc-200 mx-auto mb-3" />
                                        <p className="text-sm text-zinc-400">{search ? "No products match your search." : "No products yet."}</p>
                                        {!search && <button onClick={openAdd} className="mt-3 text-xs font-bold text-red-600 hover:underline">+ Add your first product</button>}
                                    </td>
                                </tr>
                            ) : filtered.map(p => (
                                <tr key={p.id} className="table-row-hover border-b border-zinc-50 last:border-0">
                                    <td className="px-5 py-3.5 text-[13px] font-semibold text-zinc-900">{p.name}</td>
                                    <td className="px-5 py-3.5 text-[12px] text-zinc-400 font-mono">{p.sku}</td>
                                    <td className="px-5 py-3.5 text-[13px] text-zinc-500">{p.category}</td>
                                    <td className="px-5 py-3.5 text-[13px] font-bold text-zinc-900">₦{p.price.toLocaleString()}</td>
                                    <td className="px-5 py-3.5 text-[13px] text-zinc-700">{p.stock}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all"><Edit2 size={13} /></button>
                                            <button onClick={() => p.id && handleDelete(p.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-zinc-50 flex items-center justify-between">
                    <p className="text-[11px] text-zinc-400">Showing {filtered.length} of {products.length} products</p>
                </div>
            </div>
        </div>
    );
}
