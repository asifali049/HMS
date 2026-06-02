"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddStaffPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: "",
    joiningDate: "",
    status: "Active",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/staff",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Staff Added Successfully"
        );

        router.push(
          "/dashboard/staff"
        );
      } else {
        alert(
          data.error ||
            "Failed to Add Staff"
        );
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-3xl font-bold">
        Add Staff
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Employee ID"
            className="rounded-lg border p-3"
            value={form.employeeId}
            onChange={(e) =>
              setForm({
                ...form,
                employeeId:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Full Name"
            className="rounded-lg border p-3"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="rounded-lg border p-3"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="rounded-lg border p-3"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="Role"
            className="rounded-lg border p-3"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Salary"
            className="rounded-lg border p-3"
            value={form.salary}
            onChange={(e) =>
              setForm({
                ...form,
                salary:
                  e.target.value,
              })
            }
          />

          <input
            type="date"
            className="rounded-lg border p-3"
            value={
              form.joiningDate
            }
            onChange={(e) =>
              setForm({
                ...form,
                joiningDate:
                  e.target.value,
              })
            }
          />

          <select
            className="rounded-lg border p-3"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-white"
        >
          Save Staff
        </button>
      </form>
    </div>
  );
}