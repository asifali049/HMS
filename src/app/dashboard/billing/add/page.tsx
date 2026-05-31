"use client";

import { useEffect, useMemo, useState } from "react";

type Patient = {
  id: string;
  patientId: string;
  name: string;
};

export default function AddBillPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    consultationFee: "",
    medicineCharge: "",
    otherCharge: "",
  });

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.data || []);
      });
  }, []);

  const totalAmount = useMemo(() => {
    return (
      Number(form.consultationFee || 0) +
      Number(form.medicineCharge || 0) +
      Number(form.otherCharge || 0)
    );
  }, [form]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/bills",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          patientId: form.patientId,
          consultationFee: Number(
            form.consultationFee
          ),
          medicineCharge: Number(
            form.medicineCharge
          ),
          otherCharge: Number(
            form.otherCharge
          ),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Bill Created Successfully");

      setForm({
        patientId: "",
        consultationFee: "",
        medicineCharge: "",
        otherCharge: "",
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Bill
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border bg-white p-6 shadow"
      >
        <select
          value={form.patientId}
          onChange={(e) =>
            setForm({
              ...form,
              patientId: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
          required
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

        <input
          type="number"
          placeholder="Consultation Fee"
          className="w-full rounded-lg border p-3"
          value={form.consultationFee}
          onChange={(e) =>
            setForm({
              ...form,
              consultationFee:
                e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          placeholder="Medicine Charge"
          className="w-full rounded-lg border p-3"
          value={form.medicineCharge}
          onChange={(e) =>
            setForm({
              ...form,
              medicineCharge:
                e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          placeholder="Other Charge"
          className="w-full rounded-lg border p-3"
          value={form.otherCharge}
          onChange={(e) =>
            setForm({
              ...form,
              otherCharge:
                e.target.value,
            })
          }
          required
        />

        <div className="rounded-lg bg-gray-100 p-4 text-xl font-bold">
          Total Amount: ₹{totalAmount}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
}