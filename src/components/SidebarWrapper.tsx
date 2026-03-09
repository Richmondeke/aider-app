"use client";

import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-white relative">
                {/* Noise overlay for premium feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10 p-8 pt-6">
                    {children}
                </div>
            </main>
        </>
    );
}
