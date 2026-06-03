"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Staff {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  status: string;
}

interface StaffTableProps {
  staff: Staff[];
}

export default function StaffTable({
  staff,
}: StaffTableProps) {
  const router = useRouter();

  async function deleteStaff(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/staff/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Staff deleted successfully"
        );

        router.refresh();
      } else {
        alert(
          data.error ||
            "Delete failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-800 shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 text-white">
            <th className="p-4 text-left">
              Employee ID
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Role
            </th>

            <th className="p-4 text-left">
              Salary
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {staff.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-700 text-white hover:bg-slate-700"
            >
              <td className="p-4">
                {item.employeeId}
              </td>

              <td className="p-4">
                {item.name}
              </td>

              <td className="p-4">
                {item.email}
              </td>

              <td className="p-4">
                {item.phone}
              </td>

              <td className="p-4">
                {item.role}
              </td>

              <td className="p-4">
                ₹{item.salary}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    item.status ===
                    "Active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/dashboard/staff/${item.id}`}
                    className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      deleteStaff(
                        item.id
                      )
                    }
                    className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {staff.length === 0 && (
        <div className="p-8 text-center text-gray-400">
          No staff found
        </div>
      )}
    </div>
  );
}