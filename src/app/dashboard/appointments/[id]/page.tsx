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
  const params = useParams();
  const router = useRouter();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

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
    status: "Pending",
    reason: "",
  });

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const doctorsRes =
          await fetch("/api/doctors");
        const doctorsData =
          await doctorsRes.json();

        setDoctors(
          doctorsData.data || []
        );

        const patientsRes =
          await fetch("/api/patients");
        const patientsData =
          await patientsRes.json();

        setPatients(
          patientsData.data || []
        );

        const appointmentRes =
          await fetch(
            `/api/appointments/${id}`
          );

        const appointmentData =
          await appointmentRes.json();

        const appointment =
          appointmentData.data;

        if (appointment) {
          setForm({
            patientId:
              appointment.patientId || "",
            doctorId:
              appointment.doctorId || "",
            date: appointment.date
              ? appointment.date.split(
                  "T"
                )[0]
              : "",
            status:
              appointment.status ||
              "Pending",
            reason:
              appointment.reason || "",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!id) {
      alert("ID Missing");
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
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
      console.error(error);
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border bg-white p-6 shadow"
      >
        <select
          className="w-full rounded-lg border p-3"
          value={form.patientId}
          onChange={(e) =>
            setForm({
              ...form,
              patientId:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Patient
          </option>

          {patients.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.patientId} -{" "}
              {patient.name}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border p-3"
          value={form.doctorId}
          onChange={(e) =>
            setForm({
              ...form,
              doctorId:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Doctor
          </option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full rounded-lg border p-3"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <select
          className="w-full rounded-lg border p-3"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <textarea
          rows={4}
          placeholder="Reason"
          className="w-full rounded-lg border p-3"
          value={form.reason}
          onChange={(e) =>
            setForm({
              ...form,
              reason:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white"
        >
          Update Appointment
        </button>
      </form>
    </div>
  );
}