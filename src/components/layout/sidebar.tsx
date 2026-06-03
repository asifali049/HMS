"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Users,
  CalendarDays,
  UserCog,
  Receipt,
  Settings,
  HeartPulse,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Hospital",
    href: "/dashboard/hospital",
    icon: Building2,
  },
  {
    name: "Doctors",
    href: "/dashboard/doctors",
    icon: Stethoscope,
  },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    name: "Staff",
    href: "/dashboard/staff",
    icon: UserCog,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: Receipt,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">
      
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500 p-3">
            <HeartPulse size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              MediCore
            </h1>

            <p className="text-xs text-slate-400">
              Hospital System
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Navigation
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-xs text-slate-400">
            Logged In As
          </p>

          <h3 className="mt-1 font-semibold">
            Administrator
          </h3>
        </div>
      </div>
    </aside>
  );
}