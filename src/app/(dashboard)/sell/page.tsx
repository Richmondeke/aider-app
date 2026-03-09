"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, ShoppingBag, Trash2, Minus, Plus, CreditCard,
    Banknote, ArrowRightLeft, ChevronRight, Filter, CheckCircle2,
    X, Scan, Loader2, Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { productsService, salesService } from "@/lib/firebase/service";
import type { Product } from "@/lib/firebase/service";

interface CartItem {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

type PayMethod = "Cash" | "Card" | "Transfer" | "POS";

const categories = ["All Products", "Electronics", "Computing", "Home Office", "Lifestyle", "Fashion"];

// ─── Skeleton card ────────────────────────────────────────────────────────────
function ProductSkeleton() {
    return (
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl overflow-hidden animate-pulse">
            <div className="h-48 bg-zinc-200" />
            <div className="p-6 space-y-3">
                <div className="h-2.5 bg-zinc-200 rounded w-1/3" />
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 rounded w-1/4" />
            </div>
        </div>
    );
}

export default function SellPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [payMethod, setPayMethod] = useState<PayMethod>("Cash");
    const [customerName, setCustomerName] = useState("Walk-in Customer");
    const [completing, setCompleting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Load products from Firestore
    useEffect(() => {
        if (!user?.uid) return;
        const unsub = productsService.subscribe(user.uid, (data) => {
            setProducts(data);
            setLoading(false);
        });
        return () => unsub();
    }, [user?.uid]);

    const addToCart = (product: Product) => {
        if (product.stock === 0) return;
        setCart((prev) => {
            const existing = prev.find((i) => i.productId === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.productId === product.id
                        ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.unitPrice }
                        : i
                );
            }
            return [...prev, {
                productId: product.id!,
                productName: product.name,
                unitPrice: product.price,
                quantity: 1,
                totalPrice: product.price,
            }];
        });
    };

    const updateQty = (productId: string, delta: number) => {
        setCart((prev) =>
            prev.map((i) =>
                i.productId === productId
                    ? { ...i, quantity: Math.max(0, i.quantity + delta), totalPrice: Math.max(0, i.quantity + delta) * i.unitPrice }
                    : i
            ).filter((i) => i.quantity > 0)
        );
    };

    const removeFromCart = (productId: string) => setCart((prev) => prev.filter((i) => i.productId !== productId));
    const clearCart = () => setCart([]);

    const subtotal = cart.reduce((s, i) => s + i.totalPrice, 0);
    const tax = subtotal * 0.075;
    const total = subtotal + tax;

    const handleCompletePurchase = async () => {
        if (!user?.uid || cart.length === 0) return;
        setCompleting(true);
        try {
            await salesService.add(user.uid, {
                customerName,
                items: cart,
                totalAmount: total,
                paymentMethod: payMethod,
                status: "Completed",
            });
            setSuccess(true);
            clearCart();
            setCustomerName("Walk-in Customer");
        } catch (e) {
            console.error(e);
        } finally {
            setCompleting(false);
        }
    };

    const filteredProducts = products
        .filter((p) => activeCategory === "All Products" || p.category === activeCategory)
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex gap-6 h-[calc(100vh-80px)] max-w-[1700px] mx-auto overflow-hidden">

            {/* ─── Success Modal ──────────────────────────────────────────── */}
            <AnimatePresence>
                {success && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm"
                            onClick={() => setSuccess(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl p-10 text-center max-w-sm w-full z-10"
                        >
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                                <CheckCircle2 size={32} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">Sale Complete!</h3>
                            <p className="text-sm text-zinc-500 mb-1">
                                ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })} collected via <strong>{payMethod}</strong>
                            </p>
                            <p className="text-xs text-zinc-400 mb-8">Sale recorded to Firestore successfully.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="w-full bg-zinc-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all"
                            >
                                New Sale
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── Left: Product Pane ──────────────────────────────────────── */}
            <div className="flex-1 flex flex-col gap-5 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">Make a Sale</h1>
                        <p className="text-sm text-zinc-400 mt-0.5">Scan or select products for your customer.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="btn-ghost">
                            <Scan size={18} />
                        </button>
                        <button className="btn-ghost">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search products by name, code or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-red-300"
                    />
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border",
                                activeCategory === cat
                                    ? "bg-red-600 border-red-600 text-white shadow-sm shadow-red-600/30"
                                    : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto scrollbar-none pb-6">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Package size={28} className="text-zinc-300" />
                            </div>
                            <p className="text-sm font-semibold text-zinc-500">
                                {searchQuery ? `No products match "${searchQuery}"` : "No products in this category"}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">Add products via Inventory → Products</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence>
                                {filteredProducts.map((product) => {
                                    const inCart = cart.find((i) => i.productId === product.id);
                                    return (
                                        <motion.div
                                            layout
                                            key={product.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            onClick={() => addToCart(product)}
                                            className={cn(
                                                "bg-zinc-50 border rounded-2xl overflow-hidden group cursor-pointer transition-all flex flex-col",
                                                product.stock === 0 ? "opacity-50 cursor-not-allowed border-zinc-100" : "border-zinc-200 hover:border-red-300 hover:shadow-sm",
                                                inCart && "border-red-400 bg-red-50/20"
                                            )}
                                        >
                                            <div className="h-40 relative overflow-hidden bg-zinc-200">
                                                {product.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={product.image as string} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package size={32} className="text-zinc-400" />
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/30">
                                                    <span className="text-red-600 font-bold text-xs">₦{product.price.toLocaleString()}</span>
                                                </div>
                                                {inCart && (
                                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                                        ×{inCart.quantity}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex flex-col gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{product.category}</span>
                                                <h3 className="text-sm font-bold text-zinc-900 line-clamp-2 leading-tight">{product.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className={cn(
                                                        "text-[11px] font-semibold",
                                                        product.stock === 0 ? "text-red-500" : product.stock <= 5 ? "text-amber-500" : "text-zinc-400"
                                                    )}>
                                                        {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
                                                    </span>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                        product.stock === 0 ? "bg-zinc-100 text-zinc-300" : "bg-zinc-100 text-zinc-500 group-hover:bg-red-600 group-hover:text-white"
                                                    )}>
                                                        <Plus size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Right: Cart Pane ─────────────────────────────────────────── */}
            <div className="w-[400px] card flex flex-col overflow-hidden shrink-0">
                {/* Cart Header */}
                <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                            <ShoppingBag size={16} />
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900">Current Order</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="badge badge-neutral">{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                        {cart.length > 0 && (
                            <button onClick={clearCart} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Clear cart">
                                <Trash2 size={13} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Customer name */}
                <div className="px-5 py-3 border-b border-zinc-50 shrink-0">
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Customer name..."
                        className="w-full text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 outline-none placeholder:text-zinc-400"
                    />
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-none space-y-3">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 opacity-60">
                            <ShoppingBag size={32} className="text-zinc-300 mb-3" />
                            <p className="text-sm font-medium text-zinc-500">Cart is empty</p>
                            <p className="text-xs text-zinc-400 mt-1">Click a product to add it here</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <motion.div
                                key={item.productId}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl"
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-zinc-900 truncate">{item.productName}</p>
                                        <p className="text-[11px] text-red-600 font-bold mt-0.5">₦{item.unitPrice.toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.productId)} className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors">
                                        <X size={12} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-0.5">
                                        <button onClick={() => updateQty(item.productId, -1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-zinc-100 transition-all">
                                            <Minus size={11} />
                                        </button>
                                        <span className="w-7 text-center text-xs font-bold text-zinc-900">{item.quantity}</span>
                                        <button onClick={() => updateQty(item.productId, 1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-zinc-100 transition-all">
                                            <Plus size={11} />
                                        </button>
                                    </div>
                                    <span className="text-xs font-bold text-zinc-900">₦{item.totalPrice.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Totals + Checkout */}
                <div className="px-5 py-4 border-t border-zinc-100 space-y-4 shrink-0">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>VAT (7.5%)</span>
                            <span>₦{tax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 border-t border-zinc-100">
                            <span className="text-sm font-bold text-zinc-900">Total</span>
                            <span className="text-xl font-black text-red-600">₦{total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="grid grid-cols-4 gap-1.5">
                        {(["Cash", "Card", "Transfer", "POS"] as PayMethod[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => setPayMethod(m)}
                                className={cn(
                                    "flex flex-col items-center gap-1 py-3 rounded-xl text-[10px] font-bold transition-all border",
                                    payMethod === m
                                        ? "bg-zinc-900 text-white border-zinc-900"
                                        : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                                )}
                            >
                                {m === "Cash" && <Banknote size={15} />}
                                {m === "Card" && <CreditCard size={15} />}
                                {m === "Transfer" && <ArrowRightLeft size={15} />}
                                {m === "POS" && <CreditCard size={15} />}
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Complete Purchase */}
                    <button
                        disabled={cart.length === 0 || completing}
                        onClick={handleCompletePurchase}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                    >
                        {completing ? (
                            <><Loader2 size={16} className="animate-spin" /> Processing...</>
                        ) : (
                            <>Complete Purchase <ChevronRight size={16} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
