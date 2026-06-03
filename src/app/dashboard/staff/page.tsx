import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StaffTable from "@/components/tables/staff-table";

export default async function StaffPage() {
  const staff = await prisma.staff.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Staff
        </h1>

        <Link
          href="/dashboard/staff/new"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
        >
          Add Staff
        </Link>
      </div>

      <StaffTable staff={staff} />
    </div>
  );
}