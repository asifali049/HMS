"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/patients",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      router.push(
        "/dashboard/patients"
      );
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Add Patient
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          placeholder="Patient Name"
          className="w-full rounded border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full rounded border p-3"
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
        />

        <select
          className="w-full rounded border p-3"
          value={form.gender}
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Phone"
          className="w-full rounded border p-3"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Address"
          className="w-full rounded border p-3"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <input
          placeholder="Blood Group"
          className="w-full rounded border p-3"
          value={form.bloodGroup}
          onChange={(e) =>
            setForm({
              ...form,
              bloodGroup:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Disease"
          className="w-full rounded border p-3"
          value={form.disease}
          onChange={(e) =>
            setForm({
              ...form,
              disease: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Patient
        </button>
      </form>
    </div>
  );
}