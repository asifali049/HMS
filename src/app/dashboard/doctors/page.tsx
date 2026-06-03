"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useDoctors } from "@/hooks/use-doctors";
import DoctorsTable from "@/components/tables/doctors-table";

export default function DoctorsPage() {
  const { data, isLoading } =
    useDoctors();

  if (isLoading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Doctors
          </h1>

          <p className="mt-2 text-slate-400">
            Manage hospital doctors
          </p>
        </div>

        <Link
          href="/dashboard/doctors/add"
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          <Plus size={18} />
          Add Doctor
        </Link>
      </div>

      <DoctorsTable
        doctors={data?.data || []}
      />
    </div>
  );
}