"use client";

import React from "react";
import { Camera, Mail, Phone, MapPin, Save } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] bg-zinc-800 border-4 border-zinc-900/50 flex items-center justify-center text-4xl font-black text-zinc-600 overflow-hidden">
                            AD
                        </div>
                        <button className="absolute bottom-[-10px] right-[-10px] p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-110 transition-transform">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-white">Austin Distel</h2>
                        <p className="text-zinc-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Store Owner • Premium Member</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold bg-zinc-950 px-4 py-2 rounded-xl">
                                <Mail size={14} />
                                austin@aider.com
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold bg-zinc-950 px-4 py-2 rounded-xl">
                                <Phone size={14} />
                                +234 81 223 334 44
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-10 space-y-8">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <h3 className="text-xl font-black text-white">Personal Information</h3>
                    <button className="text-blue-500 font-bold text-sm bg-blue-600/10 px-6 py-2 rounded-xl hover:bg-blue-600/20 transition-all">
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Full Identity</label>
                        <input
                            readOnly
                            value="Austin Distel"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Email Address</label>
                        <input
                            readOnly
                            value="austin@aider.com"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Contact Line</label>
                        <input
                            readOnly
                            value="+234 81 223 334 44"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Current Country</label>
                        <input
                            readOnly
                            value="Nigeria"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 outline-none"
                        />
                    </div>
                </div>

                <div className="pt-8 block">
                    <button className="bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
                        Save Profile Changes
                        <Save size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
