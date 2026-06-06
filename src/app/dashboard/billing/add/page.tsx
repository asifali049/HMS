"use client";

import { useEffect, useMemo, useState } from "react";

type Patient = {
  id: string;
  patientId: string;
  name: string;
};

export default function AddBillPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPatients, setFetchingPatients] =
    useState(true);

  const [form, setForm] = useState({
    patientId: "",
    consultationFee: "",
    medicineCharge: "",
    otherCharge: "",
  });

  useEffect(() => {
    async function loadPatients() {
      try {
        const response = await fetch(
          "/api/patients"
        );


        const data =
          await response.json();

        setPatients(data.data || []);
      } catch (error) {
        console.error(error);
        alert(
          "Failed to load patients"
        );
      } finally {
        setFetchingPatients(false);
      }
    }
    loadPatients();

  }, []);

  const totalAmount = useMemo(() => {
    return (
      Number(form.consultationFee || 0) +
      Number(form.medicineCharge || 0) +
      Number(form.otherCharge || 0)
    );
  }, [
    form.consultationFee,
    form.medicineCharge,
    form.otherCharge,
  ]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();


    try {
      setLoading(true);

      const response = await fetch(
        "/api/bills",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            patientId:
              form.patientId,
            consultationFee:
              Number(
                form.consultationFee
              ),
            medicineCharge:
              Number(
                form.medicineCharge
              ),
            otherCharge:
              Number(
                form.otherCharge
              ),
            totalAmount,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Failed to create bill"
        );
      }

      alert(
        "Bill Created Successfully"
      );

      setForm({
        patientId: "",
        consultationFee: "",
        medicineCharge: "",
        otherCharge: "",
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }


  }

  return (<div className="mx-auto max-w-4xl p-6"> <div className="mb-6"> <h1 className="text-3xl font-bold">
    Create Bill </h1>


    <p className="text-gray-500">
      Generate patient billing
      invoice
    </p>
  </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Patient
        </label>

        <select
          value={form.patientId}
          onChange={(e) =>
            setForm({
              ...form,
              patientId:
                e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
          required
          disabled={
            fetchingPatients
          }
        >
          <option value="">
            Select Patient
          </option>

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
                  patient.patientId
                }{" "}
                - {patient.name}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Consultation Fee
        </label>

        <input
          type="number"
          min="0"
          placeholder="Consultation Fee"
          className="w-full rounded-lg border p-3"
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
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Medicine Charge
        </label>

        <input
          type="number"
          min="0"
          placeholder="Medicine Charge"
          className="w-full rounded-lg border p-3"
          value={
            form.medicineCharge
          }
          onChange={(e) =>
            setForm({
              ...form,
              medicineCharge:
                e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Other Charge
        </label>

        <input
          type="number"
          min="0"
          placeholder="Other Charge"
          className="w-full rounded-lg border p-3"
          value={
            form.otherCharge
          }
          onChange={(e) =>
            setForm({
              ...form,
              otherCharge:
                e.target.value,
            })
          }
          required
        />
      </div>

      <div className="rounded-lg bg-gray-100 p-4 text-xl font-bold">
        Total Amount: ₹
        {totalAmount.toLocaleString()}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Creating..."
          : "Create Bill"}
      </button>
    </form>
  </div>


  );
}
