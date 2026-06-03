"use client";

import {
  CalendarDays,
  Clock,
  FileText,
  Stethoscope,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = {
  id: string;
  name: string;
};

type Patient = {
  id: string;
  name: string;
  patientId: string;
};

export default function AddAppointmentPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [form, setForm] =
    useState({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
    });

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) =>
        setDoctors(
          data.data || []
        )
      );

    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) =>
        setPatients(
          data.data || []
        )
      );
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/appointments",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              form
            ),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Appointment Created Successfully"
        );

        router.push(
          "/dashboard/appointments"
        );
      } else {
        alert(
          data.error ||
            "Create Failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Create Appointment
        </h1>

        <p className="mt-2 text-slate-400">
          Schedule a new patient appointment
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
                Patient
              </label>

              <select
                value={
                  form.patientId
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    patientId:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map(
                  (
                    patient
                  ) => (
                    <option
                      key={
                        patient.id
                      }
                      value={
                        patient.id
                      }
                    >
                      {
                        patient.patientId
                      }{" "}
                      -{" "}
                      {
                        patient.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Stethoscope
                  size={16}
                />
                Doctor
              </label>

              <select
                value={
                  form.doctorId
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    doctorId:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map(
                  (
                    doctor
                  ) => (
                    <option
                      key={
                        doctor.id
                      }
                      value={
                        doctor.id
                      }
                    >
                      {
                        doctor.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <CalendarDays
                  size={16}
                />
                Appointment Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Clock size={16} />
                Appointment Time
              </label>

              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({
                    ...form,
                    time:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <FileText
                  size={16}
                />
                Reason
              </label>

              <textarea
                rows={5}
                value={
                  form.reason
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    reason:
                      e.target
                        .value,
                  })
                }
                placeholder="Enter appointment reason..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}