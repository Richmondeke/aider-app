import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Products from "@/components/landing/Products";
import DetailedServices from "@/components/landing/DetailedServices";
import StickyTransition from "@/components/landing/StickyTransition";
import Team from "@/components/landing/Team";
import Newsletter from "@/components/landing/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Header />

      <Hero />
      <DetailedServices />
      <Process />
      <Products />
      <Team />
      <Newsletter />

      <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo.png" alt="Aider" className="h-8 w-auto object-contain brightness-0 invert" />
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Aider Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
