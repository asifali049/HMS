"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPatientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.data)
          return;

        const patient = data.data;

        setForm({
          name: patient.name || "",
          age: String(patient.age || ""),
          gender: patient.gender || "",
          phone: patient.phone || "",
          address: patient.address || "",
          bloodGroup:
            patient.bloodGroup || "",
          disease: patient.disease || "",
        });
      });
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      `/api/patients/${id}`,
      {
        method: "PATCH",
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
      alert("Patient Updated");
      router.push(
        "/dashboard/patients"
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Patient
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full rounded border p-3"
          placeholder="Name"
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
          className="w-full rounded border p-3"
          placeholder="Age"
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
          <option value="">
            Select Gender
          </option>
          <option value="Male">
            Male
          </option>
          <option value="Female">
            Female
          </option>
        </select>

        <input
          className="w-full rounded border p-3"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Blood Group"
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
          className="w-full rounded border p-3"
          placeholder="Disease"
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
          Update Patient
        </button>
      </form>
    </div>
  );
}