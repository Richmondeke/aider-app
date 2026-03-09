"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth") || pathname.startsWith("/onboarding");

    return (
        <>
            {!isAuthPage && <Sidebar />}
            <main className={cn(
                "flex-1 overflow-y-auto bg-zinc-950 relative",
                isAuthPage && "w-full"
            )}>
                {/* Noise overlay for premium feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className={cn("relative z-10", !isAuthPage && "p-8 pt-6")}>
                    {children}
                </div>
            </main>
        </>
    );
}
