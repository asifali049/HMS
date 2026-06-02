"use client";

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

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data.data || []));

    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data.data || []));
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.success) {
        alert(
          "Appointment Created"
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

      alert("Server Error");
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <select
          className="w-full rounded-lg border p-3"
          value={form.patientId}
          onChange={(e) =>
            setForm({
              ...form,
              patientId: e.target.value,
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
              doctorId: e.target.value,
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

        <input
          type="time"
          className="w-full rounded-lg border p-3"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
        />

        <textarea
          rows={4}
          placeholder="Reason"
          className="w-full rounded-lg border p-3"
          value={form.reason}
          onChange={(e) =>
            setForm({
              ...form,
              reason: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
}