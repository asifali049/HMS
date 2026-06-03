"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Doctor = {
  id: string;
  name: string;
};

type Patient = {
  id: string;
  name: string;
  patientId: string;
};

export default function EditAppointmentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    status: "PENDING",
    notes: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const doctorsRes =
          await fetch("/api/doctors");

        const patientsRes =
          await fetch("/api/patients");

        const appointmentRes =
          await fetch(
            `/api/appointments/${id}`
          );

        const doctorsData =
          await doctorsRes.json();

        const patientsData =
          await patientsRes.json();

        const appointmentData =
          await appointmentRes.json();

        setDoctors(
          doctorsData.data || []
        );

        setPatients(
          patientsData.data || []
        );

        const appointment =
          appointmentData.data;

        setForm({
          patientId:
            appointment.patientId,
          doctorId:
            appointment.doctorId,
          date:
            appointment.date
              ?.split("T")[0] || "",
          time:
            appointment.time || "",
          reason:
            appointment.reason ||
            "",
          status:
            appointment.status ||
            "PENDING",
          notes:
            appointment.notes || "",
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response =
        await fetch(
          `/api/appointments/${id}`,
          {
            method: "PATCH",
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
          "Appointment Updated Successfully"
        );

        router.push(
          "/dashboard/appointments"
        );
      } else {
        alert(
          data.error ||
            "Update Failed"
        );
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  }

  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Edit Appointment
      </h1>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
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
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              >
                {patients.map(
                  (patient) => (
                    <option
                      key={
                        patient.id
                      }
                      value={
                        patient.id
                      }
                    >
                      {
                        patient.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
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
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              >
                {doctors.map(
                  (doctor) => (
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
              <label className="mb-2 block text-sm text-slate-400">
                Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Time
              </label>

              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({
                    ...form,
                    time:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Status
              </label>

              <select
                value={
                  form.status
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    status:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              >
                <option value="PENDING">
                  Pending
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Reason
            </label>

            <textarea
              rows={4}
              value={form.reason}
              onChange={(e) =>
                setForm({
                  ...form,
                  reason:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Notes
            </label>

            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
          >
            Update Appointment
          </button>
        </form>
      </div>
    </div>
  );
}