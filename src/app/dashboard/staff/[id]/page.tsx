"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function loadStaff() {
      try {
        const response = await fetch(
          `/api/staff/${id}`
        );

        const data =
          await response.json();

        if (data.success && data.data) {
          setForm({
            employeeId:
              data.data.employeeId || "",

            name:
              data.data.name || "",

            email:
              data.data.email || "",

            phone:
              data.data.phone || "",

            role:
              data.data.role || "",

            salary: String(
              data.data.salary || ""
            ),

            joiningDate:
              data.data.joiningDate?.split(
                "T"
              )[0] || "",

            status:
              data.data.status ||
              "Active",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadStaff();
    }
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/staff/${id}`,
        {
          method: "PATCH",
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
          "Staff Updated Successfully"
        );

        router.push(
          "/dashboard/staff"
        );
      } else {
        alert(
          data.error ||
            "Update Failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <h1 className="mb-6 text-4xl font-bold text-white">
        Edit Staff
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-slate-800 p-8 shadow-lg"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            placeholder="Employee ID"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
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

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Update Staff
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/staff"
              )
            }
            className="rounded-lg bg-slate-600 px-6 py-3 font-semibold text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}