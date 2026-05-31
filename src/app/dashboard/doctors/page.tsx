"use client";

import Link from "next/link";
import { useDoctors } from "@/hooks/use-doctors";
import DoctorsTable from "@/components/tables/doctors-table";

export default function DoctorsPage() {
  const { data, isLoading } = useDoctors();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Doctors</h1>

        <Link
          href="/dashboard/doctors/add"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Doctor
        </Link>
      </div>

      <DoctorsTable doctors={data?.data || []} />
    </div>
  );
}