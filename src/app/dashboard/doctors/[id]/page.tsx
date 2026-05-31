"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDoctorPage() {
  const { id } = useParams();
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

useEffect(() => {
  if (!id) return;

  fetch(`/api/doctors/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("API RESPONSE:", data);

      if (!data || !data.data) {
        console.error("Doctor not found");
        return;
      }

      const doctor = data.data;

      setForm({
        name: doctor.name ?? "",
        specialization:
          doctor.specialization ?? "",
        qualification:
          doctor.qualification ?? "",
        experience: String(
          doctor.experience ?? ""
        ),
        consultationFee: String(
          doctor.consultationFee ?? ""
        ),
        mobile: doctor.mobile ?? "",
        email: doctor.email ?? "",
      });
    })
    .catch((err) =>
      console.error("Fetch Error:", err)
    );
}, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      `/api/doctors/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...form,
          experience: Number(
            form.experience
          ),
          consultationFee: Number(
            form.consultationFee
          ),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      router.push(
        "/dashboard/doctors"
      );
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Doctor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
          value={form.mobile}
          onChange={(e) =>
            setForm({
              ...form,
              mobile: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
}