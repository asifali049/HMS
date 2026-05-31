"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDoctorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    mobile: "",
    email: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        experience: Number(form.experience),
        consultationFee: Number(
          form.consultationFee
        ),
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/dashboard/doctors");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Add Doctor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          placeholder="Doctor Name"
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
          placeholder="Specialization"
          className="w-full rounded border p-3"
          value={form.specialization}
          onChange={(e) =>
            setForm({
              ...form,
              specialization:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Qualification"
          className="w-full rounded border p-3"
          value={form.qualification}
          onChange={(e) =>
            setForm({
              ...form,
              qualification:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Experience"
          className="w-full rounded border p-3"
          value={form.experience}
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Consultation Fee"
          className="w-full rounded border p-3"
          value={form.consultationFee}
          onChange={(e) =>
            setForm({
              ...form,
              consultationFee:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Mobile"
          className="w-full rounded border p-3"
          value={form.mobile}
          onChange={(e) =>
            setForm({
              ...form,
              mobile: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="w-full rounded border p-3"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Doctor
        </button>
      </form>
    </div>
  );
}