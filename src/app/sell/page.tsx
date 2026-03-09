"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingBag,
    Trash2,
    Minus,
    Plus,
    CreditCard,
    Banknote,
    ChevronRight,
    Filter,
    CheckCircle2,
    X,
    Scan
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    { id: 1, name: "Premium Wireless Headset", category: "Electronics", price: 12500, stock: 12, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
    { id: 2, name: "Ergonomic Mechanical Keyboard", category: "Computing", price: 45000, stock: 5, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80" },
    { id: 3, name: "Minimalist Desk Lamp", category: "Home Office", price: 8900, stock: 20, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80" },
    { id: 4, name: "Smart Water Bottle", category: "Lifestyle", price: 15400, stock: 8, image: "https://images.unsplash.com/photo-1602143307185-8c1503945a66?w=800&q=80" },
    { id: 5, name: "Leather Carry Bag", category: "Fashion", price: 32000, stock: 15, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80" },
    { id: 6, name: "4K Desktop Monitor", category: "Electronics", price: 185000, stock: 3, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80" },
];

const categories = ["All Products", "Electronics", "Computing", "Home Office", "Lifestyle", "Fashion"];

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function SellPage() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCheckout, setShowCheckout] = useState(false);

    const addToCart = (product: any) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.075;
    const total = subtotal + tax;

    return (
        <div className="flex gap-8 h-[calc(100vh-100px)] max-w-[1700px] mx-auto overflow-hidden">
            {/* Product Selection Pane (Left) */}
            <div className="flex-1 flex flex-col gap-8 overflow-hidden">
                {/* Top Controls */}
                <div className="flex flex-col gap-6 shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Make a Sale</h1>
                            <p className="text-zinc-500">Scan or select products for your customer.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 p-3 rounded-2xl hover:bg-zinc-800 transition-all group">
                                <Scan size={22} className="group-hover:text-blue-500 transition-colors" />
                            </button>
                            <div className="h-10 w-px bg-zinc-800 mx-1" />
                            <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 p-3 rounded-2xl hover:bg-zinc-800 transition-all">
                                <Filter size={22} />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
                        <input
                            type="text"
                            placeholder="Search products by name, code or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl py-5 pl-14 pr-6 text-lg text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600 shadow-xl shadow-black/20"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border",
                                    activeCategory === cat
                                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-none pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {products
                                .filter(p => activeCategory === "All Products" || p.category === activeCategory)
                                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onClick={() => addToCart(product)}
                                        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group cursor-pointer hover:border-blue-600/50 transition-all flex flex-col"
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                            />
                                            <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                                                <span className="text-blue-400 font-bold text-sm">₦{product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-blue-500 transition-colors">
                                                    {product.category}
                                                </span>
                                                <h3 className="text-zinc-100 font-bold mt-1 line-clamp-2">{product.name}</h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-xs text-zinc-500 font-medium">{product.stock} in stock</span>
                                                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <Plus size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Cart Side Pane (Right) */}
            <div className="w-[450px] bg-zinc-900 border border-zinc-800 rounded-[40px] flex flex-col overflow-hidden relative shadow-2xl">
                <div className="p-8 border-b border-zinc-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600/10 p-2 rounded-xl text-blue-500">
                            <ShoppingBag size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Current Order</h3>
                    </div>
                    <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-lg text-xs font-bold">
                        {cart.reduce((s, i) => s + i.quantity, 0)} Items
                    </span>
                </div>

                {/* Cart List */}
                <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-none space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 px-8">
                            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag size={32} className="text-zinc-600" />
                            </div>
                            <p className="text-zinc-400 font-medium">Your cart is empty.</p>
                            <p className="text-zinc-600 text-sm mt-2">Select products from the list to start a sale.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={item.id}
                                className="bg-zinc-950/50 border border-zinc-800/50 p-4 rounded-2xl group relative"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-zinc-100 truncate">{item.name}</p>
                                        <p className="text-blue-400 text-sm font-bold mt-1">₦{item.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-1.5 text-zinc-600 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <span className="text-zinc-100 font-bold">
                                        ₦{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Totals & Checkout Panel */}
                <div className="p-8 bg-zinc-950/50 border-t border-zinc-800 space-y-6 shrink-0 backdrop-blur-md">
                    <div className="space-y-3">
                        <div className="flex justify-between text-zinc-500 text-sm font-medium">
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500 text-sm font-medium">
                            <span>VAT (7.5%)</span>
                            <span>₦{tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xl font-bold text-white">Total</span>
                            <span className="text-2xl font-black text-blue-500">₦{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center gap-1.5 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:border-zinc-600 transition-all font-bold">
                            <Banknote size={20} />
                            <span className="text-xs">Cash</span>
                        </button>
                        <button className="flex flex-col items-center gap-1.5 py-4 bg-blue-600/10 border border-blue-600/20 text-blue-400 hover:bg-blue-600/20 transition-all font-bold">
                            <CreditCard size={20} />
                            <span className="text-xs">Card</span>
                        </button>
                    </div>

                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 group"
                    >
                        Complete Purchase
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
