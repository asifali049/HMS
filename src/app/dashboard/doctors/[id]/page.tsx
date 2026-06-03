"use client";

import {
  User,
  Stethoscope,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Phone,
  Mail,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditDoctorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
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

    async function loadDoctor() {
      try {
        const response =
          await fetch(
            `/api/doctors/${id}`
          );

        const data =
          await response.json();

        if (
          data &&
          data.data
        ) {
          const doctor =
            data.data;

          setForm({
            name:
              doctor.name || "",
            specialization:
              doctor.specialization ||
              "",
            qualification:
              doctor.qualification ||
              "",
            experience:
              String(
                doctor.experience ||
                  ""
              ),
            consultationFee:
              String(
                doctor.consultationFee ||
                  ""
              ),
            mobile:
              doctor.mobile ||
              "",
            email:
              doctor.email ||
              "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDoctor();
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      const response =
        await fetch(
          `/api/doctors/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              ...form,
              experience:
                Number(
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
        await response.json();

      if (data.success) {
        alert(
          "Doctor updated successfully"
        );

        router.push(
          "/dashboard/doctors"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Update failed"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white">
        Loading Doctor...
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Edit Doctor
        </h1>

        <p className="mt-2 text-slate-400">
          Update doctor
          information
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <form
          onSubmit={
            handleSubmit
          }
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
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Stethoscope size={16} />
                Specialization
              </label>

              <input
                value={
                  form.specialization
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    specialization:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <GraduationCap size={16} />
                Qualification
              </label>

              <input
                value={
                  form.qualification
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    qualification:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Briefcase size={16} />
                Experience
              </label>

              <input
                type="number"
                value={
                  form.experience
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    experience:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <IndianRupee size={16} />
                Consultation Fee
              </label>

              <input
                type="number"
                value={
                  form.consultationFee
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    consultationFee:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Phone size={16} />
                Mobile
              </label>

              <input
                value={
                  form.mobile
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    mobile:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Mail size={16} />
                Email
              </label>

              <input
                type="email"
                value={
                  form.email
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    email:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : "Update Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}