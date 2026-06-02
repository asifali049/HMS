import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function StaffPage() {
  const staff = await prisma.staff.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalStaff = staff.length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Staff Management
        </h1>

        <Link
          href="/dashboard/staff/add"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
        >
          Add Staff
        </Link>
      </div>

      <div className="mb-6 rounded-xl border bg-white p-4">
        <p className="text-slate-500">
          Total Staff
        </p>

        <h2 className="text-3xl font-bold">
          {totalStaff}
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.role}
                </td>

                <td className="p-4">
                  {item.email}
                </td>

                <td className="p-4">
                  {item.phone}
                </td>

                <td className="p-4">
                  ₹{item.salary}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <Link
                      href={`/dashboard/staff/${item.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={async () => {
                        "use client";
                      }}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}