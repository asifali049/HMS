"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  MapPin,
  Droplets,
  HeartPulse,
  Calendar,
} from "lucide-react";

export default function AddPatientPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
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

      const data =
        await response.json();

      if (data.success) {
        router.push(
          "/dashboard/patients"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to save patient"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Add Patient
        </h1>

        <p className="mt-2 text-slate-400">
          Register a new patient
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* Patient Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <User size={16} />
                Patient Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Asif Ali"
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Calendar size={16} />
                Age
              </label>

              <input
                type="number"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="25"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Gender
              </label>

              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              >
                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Phone size={16} />
                Phone
              </label>

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Droplets size={16} />
                Blood Group
              </label>

              <input
                value={
                  form.bloodGroup
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    bloodGroup:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="O+"
              />
            </div>

            {/* Disease */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <HeartPulse size={16} />
                Disease
              </label>

              <input
                value={form.disease}
                onChange={(e) =>
                  setForm({
                    ...form,
                    disease:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Fever"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={16} />
                Address
              </label>

              <textarea
                rows={4}
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Patient address..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}