"use client";

import {
  User,
  Phone,
  MapPin,
  Droplets,
  HeartPulse,
  Calendar,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditPatientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
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

    async function loadPatient() {
      try {
        const response =
          await fetch(
            `/api/patients/${id}`
          );

        const data =
          await response.json();

        if (
          data.success &&
          data.data
        ) {
          const patient =
            data.data;

          setForm({
            name:
              patient.name || "",
            age: String(
              patient.age || ""
            ),
            gender:
              patient.gender ||
              "",
            phone:
              patient.phone || "",
            address:
              patient.address ||
              "",
            bloodGroup:
              patient.bloodGroup ||
              "",
            disease:
              patient.disease ||
              "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      const response =
        await fetch(
          `/api/patients/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              ...form,
              age: Number(
                form.age
              ),
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Patient Updated Successfully"
        );

        router.push(
          "/dashboard/patients"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white">
        Loading Patient...
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Edit Patient
        </h1>

        <p className="mt-2 text-slate-400">
          Update patient information
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
                Patient Name
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
              />
            </div>

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
                    age:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

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
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

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
              />
            </div>

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
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <HeartPulse size={16} />
                Disease
              </label>

              <input
                value={
                  form.disease
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    disease:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={16} />
                Address
              </label>

              <textarea
                rows={4}
                value={
                  form.address
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
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
              : "Update Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}