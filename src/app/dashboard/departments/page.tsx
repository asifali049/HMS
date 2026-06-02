"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Department = {
  id: string;
  name: string;
  description: string;
};

export default function DepartmentsPage() {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.data || []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(
    id: string
  ) {
    const confirmDelete = confirm(
      "Delete Department?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `/api/departments/${id}`,
      {
        method: "DELETE",
      }
    );

    const data =
      await response.json();

    if (data.success) {
      setDepartments(
        departments.filter(
          (department) =>
            department.id !== id
        )
      );
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Departments
          </h1>

          <p className="text-slate-500">
            Manage Hospital Departments
          </p>
        </div>

        <Link
          href="/dashboard/departments/add"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Add Department
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map(
              (department) => (
                <tr
                  key={department.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {department.name}
                  </td>

                  <td className="p-4">
                    {
                      department.description
                    }
                  </td>

                  <td className="p-4 flex gap-2">
                    <Link
                      href={`/dashboard/departments/${department.id}`}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          department.id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}