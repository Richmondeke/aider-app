"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Store,
    Users,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Package,
    BadgeDollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { db, auth } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const steps = [
    {
        id: "business",
        title: "Business Details",
        description: "Tell us about your business",
        icon: Building2,
    },
    {
        id: "type",
        title: "Business Type",
        description: "What do you sell?",
        icon: Store,
    },
    {
        id: "initial",
        title: "Initial Setup",
        description: "Configure your store settings",
        icon: Settings,
    }
];

import { Settings } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "",
        currency: "USD",
        taxRate: "0",
    });

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    onboarded: true,
                    businessName: formData.businessName,
                    businessType: formData.businessType,
                    currency: formData.currency,
                    taxRate: formData.taxRate,
                });
                router.push("/dashboard");
            } catch (error) {
                console.error("Error updating onboarding status:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-red-600/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-purple-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Progress bar */}
                <div className="flex gap-2 mb-12">
                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-300",
                                idx <= currentStep ? "bg-red-600" : "bg-zinc-100"
                            )}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-zinc-50/50 backdrop-blur-xl border border-zinc-200 p-10 rounded-[32px] shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-red-600/10 p-3 rounded-2xl">
                                {React.createElement(steps[currentStep].icon, { className: "text-red-500", size: 28 })}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 leading-none mb-1">{steps[currentStep].title}</h2>
                                <p className="text-zinc-500">{steps[currentStep].description}</p>
                            </div>
                        </div>

                        <div className="space-y-6 min-h-[300px]">
                            {currentStep === 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 ml-1">Business Registered Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Acme Corporation"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 focus:border-red-500 rounded-2xl p-4 text-zinc-900 outline-none transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: "retail", label: "Retail", icon: Store },
                                        { id: "wholesale", label: "Wholesale", icon: Package },
                                        { id: "services", label: "Services", icon: BadgeDollarSign },
                                        { id: "other", label: "Other", icon: Building2 },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setFormData({ ...formData, businessType: type.id })}
                                            className={cn(
                                                "flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all hover:bg-zinc-100/50",
                                                formData.businessType === type.id
                                                    ? "bg-red-600/10 border-blue-600 text-red-600"
                                                    : "bg-white/50 border-zinc-200 text-zinc-500"
                                            )}
                                        >
                                            <type.icon size={32} />
                                            <span className="font-semibold">{type.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 ml-1">Default Currency</label>
                                        <select
                                            value={formData.currency}
                                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 focus:border-red-500 rounded-2xl p-4 text-zinc-900 outline-none appearance-none"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="NGN">NGN (₦)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 ml-1">Default Tax Rate (%)</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={formData.taxRate}
                                            onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 focus:border-red-500 rounded-2xl p-4 text-zinc-900 outline-none"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-12 gap-4">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={cn(
                                    "px-8 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition-all",
                                    currentStep === 0 ? "opacity-0 pointer-events-none" : "text-zinc-500 hover:text-zinc-900"
                                )}
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={currentStep === 0 && !formData.businessName}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white px-10 py-3.5 rounded-2xl font-bold flex items-center gap-2 group transition-all shadow-xl shadow-red-600/20"
                            >
                                {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
