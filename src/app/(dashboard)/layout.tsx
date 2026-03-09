"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SidebarWrapper from "@/components/SidebarWrapper";
import { CommandPalette } from "@/components/CommandPalette";
import { TopNav } from "@/components/TopNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden w-full bg-white text-zinc-900 font-sans">
            <SidebarWrapper>
                <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                    <TopNav />
                    <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
                        {children}
                    </main>
                    <CommandPalette />
                </div>
            </SidebarWrapper>
        </div>
    );
}
