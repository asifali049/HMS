import Link from "next/link";
import {
  UserPlus,
  Stethoscope,
  CalendarPlus,
  Receipt,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/doctors/add"
          className="flex items-center gap-3 rounded-xl border p-4 hover:bg-slate-50"
        >
          <Stethoscope className="text-green-600" />
          Add Doctor
        </Link>

        <Link
          href="/dashboard/patients/add"
          className="flex items-center gap-3 rounded-xl border p-4 hover:bg-slate-50"
        >
          <UserPlus className="text-blue-600" />
          Add Patient
        </Link>

        <Link
          href="/dashboard/appointments/add"
          className="flex items-center gap-3 rounded-xl border p-4 hover:bg-slate-50"
        >
          <CalendarPlus className="text-orange-500" />
          Appointment
        </Link>

        <Link
          href="/dashboard/billing/add"
          className="flex items-center gap-3 rounded-xl border p-4 hover:bg-slate-50"
        >
          <Receipt className="text-purple-600" />
          Create Bill
        </Link>
      </div>
    </div>
  );
}