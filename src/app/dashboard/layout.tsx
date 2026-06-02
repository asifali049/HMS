"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  Building2,
  Hospital,
  HeartPulse,
  Settings,
  LogOut,
  User,
  ChevronRight,
  Shield,
} from "lucide-react";

const navLinks = [
  {
    href: "/dashboard/settings/security",label: "Security", icon: Shield, },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/dashboard/departments", label: "Departments", icon: Building2 },
  { href: "/dashboard/hospital", label: "Hospital", icon: Hospital },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {navLinks.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
              ${isActive
                ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
          >
            {/* Active left accent bar */}
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-400" />
            )}

            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200
                ${isActive
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/40"
                  : "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-300"
                }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>

            <span className="flex-1 tracking-wide">{label}</span>

            <ChevronRight
              className={`h-3 w-3 transition-all duration-200
                ${isActive ? "text-emerald-400 opacity-100" : "opacity-0 group-hover:opacity-40"}`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="relative flex w-64 flex-shrink-0 flex-col overflow-hidden bg-slate-900">
        {/* Subtle radial glow top-left */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.07)_0%,_transparent_55%)]" />

        {/* Logo */}
        <div className="relative flex items-center gap-3 border-b border-white/5 px-5 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25">
            <HeartPulse className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">
              MediCore
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
              Hospital System
            </p>
          </div>
        </div>

        {/* Nav */}
        <div className="relative flex-1 overflow-y-auto py-4">
          <p className="mb-2 px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            Navigation
          </p>
          <SidebarNav />
        </div>

        {/* Account label */}
        <div className="relative px-6 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            Account
          </p>
        </div>

        {/* Bottom Section */}
        {/* Bottom User Section */}
        <div className="border-t border-slate-700/60 p-4">

          <div className="mb-3 rounded-xl bg-slate-800 px-4 py-3">
            <p className="text-sm font-semibold text-slate-200">
              Admin
            </p>
          </div>

          <div className="space-y-2">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl bg-slate-800 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>

            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}