"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 12.2c0-.8-.1-1.6-.3-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.8c2.3-2.1 3.6-5.2 3.6-8.7z" fill="#4285F4" />
        <path d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-3c-1.1.7-2.5 1.1-4.1 1.1-3.1 0-5.8-2.1-6.7-5H1.4v3.1C3.4 21.3 7.4 24 12 24z" fill="#34A853" />
        <path d="M5.3 14.2C5 13.3 5 12.4 5.3 11.5V8.4H1.4C.5 10.2 0 12.1 0 14.1s.5 3.9 1.4 5.7l3.9-3.1v-2.5z" fill="#FBBC05" />
        <path d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.7L5.3 9.8c.9-2.9 3.6-5 6.7-5z" fill="#EA4335" />
    </svg>
);

export default function LoginPage() {
    const router = useRouter();
    const { signInWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            router.push("/dashboard");
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError("");
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            setError("Google sign-in failed. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <img src="/logo.png" alt="Aider Logo" className="h-12 w-auto drop-shadow-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 mb-2">Welcome back</h1>
                    <p className="text-zinc-500">Log in to your Aider account.</p>
                </div>

                <div className="bg-zinc-50/50 backdrop-blur-xl border border-zinc-200 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/50 border border-zinc-200 focus:border-red-500 rounded-xl py-3 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-600 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full bg-white/50 border border-zinc-200 focus:border-red-500 rounded-xl py-3 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-600 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-red-600/20"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-zinc-500 font-bold tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading || isGoogleLoading}
                        className="w-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                        {isGoogleLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                <GoogleIcon />
                                <span>Sign in with Google</span>
                            </>
                        )}
                    </button>

                    <div className="mt-8 text-center text-sm">
                        <Link href="#" className="text-zinc-500 hover:text-zinc-700 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-zinc-500 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="text-red-600 hover:text-blue-300 font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
