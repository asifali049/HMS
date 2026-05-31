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
      .then((data) => setDoctors(data.data));

    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data.data));
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch(
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

    const data = await res.json();

    if (data.success) {
      router.push(
        "/dashboard/appointments"
      );
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <select
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
        />

        <input
          placeholder="Reason"
          className="w-full border p-3 rounded"
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
}