"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function AddDoctorPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

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

    setLoading(true);

    try {
      const res = await fetch(
        "/api/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            experience: Number(
              form.experience
            ),
            consultationFee:
              Number(
                form.consultationFee
              ),
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        router.push(
          "/dashboard/doctors"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to save doctor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Add Doctor
        </h1>

        <p className="mt-2 text-slate-400">
          Create a new doctor
          profile
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <User size={16} />
                Doctor Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Dr. Rahul Sharma"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Stethoscope
                  size={16}
                />
                Specialization
              </label>

              <input
                value={
                  form.specialization
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialization:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Cardiology"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <GraduationCap
                  size={16}
                />
                Qualification
              </label>

              <input
                value={
                  form.qualification
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    qualification:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="MBBS, MD"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Briefcase
                  size={16}
                />
                Experience
              </label>

              <input
                type="number"
                value={
                  form.experience
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="5"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <IndianRupee
                  size={16}
                />
                Consultation Fee
              </label>

              <input
                type="number"
                value={
                  form.consultationFee
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    consultationFee:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Phone size={16} />
                Mobile
              </label>

              <input
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Mail size={16} />
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="doctor@hospital.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}