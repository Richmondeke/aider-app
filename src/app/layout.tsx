import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import SidebarWrapper from "@/components/SidebarWrapper";
import { CommandPalette } from "@/components/CommandPalette";
import { TopNav } from "@/components/TopNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aider | Inventory Management",
  description: "Premium inventory management for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          plusJakarta.variable,
          "antialiased bg-zinc-950 text-zinc-100 font-sans overflow-hidden flex h-screen selection:bg-blue-600/30 selection:text-white"
        )}
      >
        <AuthProvider>
          <SidebarWrapper>
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
              <TopNav />
              <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
                {children}
              </main>
              <CommandPalette />
            </div>
          </SidebarWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
