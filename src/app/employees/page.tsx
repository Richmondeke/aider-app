"use client";

import React from "react";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Mail,
    Phone,
    Shield,
    Award,
    MoreVertical,
    ChevronRight,
    TrendingVertical,
    CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
    {
        id: "EMP-001",
        name: "Benjamin Franklin",
        role: "Store Manager",
        email: "benjamin@aider.com",
        phone: "0801 000 0001",
        department: "Management",
        access: "Full Admin",
        joined: "Aug 2024"
    },
    {
        id: "EMP-002",
        name: "Jessica Pearson",
        role: "Cashier",
        email: "jessica@aider.com",
        phone: "0801 000 0002",
        department: "Sales",
        access: "POS Only",
        joined: "Jan 2025"
    },
    {
        id: "EMP-003",
        name: "Harvey Specter",
        role: "Auditor",
        email: "harvey@aider.com",
        phone: "0801 000 0003",
        department: "Finance",
        access: "Full History",
        joined: "Mar 2025"
    },
];

export default function EmployeesPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Team Directory</h1>
                    <p className="text-zinc-500 mt-1">Manage staff accounts, access permissions and performance tracking.</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-500 transition-all font-bold shadow-xl shadow-blue-600/20">
                    <UserPlus size={20} />
                    Add Employee
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Staff", value: "8", icon: Users, color: "blue" },
                    { label: "On Duty", value: "5", icon: Award, color: "emerald" },
                    { label: "Pending Invites", value: "2", icon: Mail, color: "amber" },
                    { label: "Roles", value: "4", icon: Shield, color: "purple" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[32px] flex items-center gap-5">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                            stat.color === "blue" && "bg-blue-600/10 text-blue-500",
                            stat.color === "emerald" && "bg-emerald-600/10 text-emerald-500",
                            stat.color === "amber" && "bg-amber-600/10 text-amber-500",
                            stat.color === "purple" && "bg-purple-600/10 text-purple-500",
                        )}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                            <p className="text-xl font-black text-white mt-0.5">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Employee Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {employees.map((emp) => (
                    <div
                        key={emp.id}
                        className="group bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-[40px] p-8 flex flex-col gap-8 transition-all relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between relative">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-[24px] bg-zinc-800 border-2 border-zinc-700/50 flex items-center justify-center text-2xl font-black text-zinc-500 uppercase">
                                    {emp.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">{emp.name}</h3>
                                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{emp.role}</span>
                                </div>
                            </div>
                            <button className="p-2.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                                <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest block mb-1">Department</span>
                                <span className="text-sm font-bold text-zinc-200">{emp.department}</span>
                            </div>
                            <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                                <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest block mb-1">Joined</span>
                                <span className="text-sm font-bold text-zinc-200">{emp.joined}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-zinc-400">
                                <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-zinc-500" />
                                </div>
                                <span className="text-sm font-medium truncate">{emp.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-400">
                                <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
                                    <Shield size={14} className="text-zinc-500" />
                                </div>
                                <span className="text-sm font-medium">Access: {emp.access}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Performance</span>
                                <div className="flex items-center gap-1.5 text-emerald-500">
                                    <TrendingVertical size={16} />
                                    <span className="text-sm font-black">+14% Growth</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold text-sm transition-all group/btn">
                                Activity
                                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
