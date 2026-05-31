"use client";

import Link from "next/link";
import { usePatients } from "@/hooks/use-patients";
import PatientsTable from "@/components/tables/patients-table";

export default function PatientsPage() {
  const { data, isLoading } =
    usePatients();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Patients
        </h1>

        <Link
          href="/dashboard/patients/add"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Patient
        </Link>
      </div>

      <PatientsTable
        patients={data?.data || []}
      />
    </div>
  );
}