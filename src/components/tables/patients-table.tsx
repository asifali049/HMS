"use client";

import Link from "next/link";

type Patient = {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  disease: string;
};

interface Props {
  patients: Patient[];
}

export default function PatientsTable({
  patients,
}: Props) {
  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/patients/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-4 text-left text-slate-300">
              Patient ID
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Name
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Age
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Gender
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Disease
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-slate-400"
              >
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-slate-800/50 transition"
              >
                <td className="px-6 py-4 text-white">
                  {patient.patientId}
                </td>

                <td className="px-6 py-4 text-white">
                  {patient.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {patient.age}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {patient.gender}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {patient.phone}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {patient.disease}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          patient.id
                        )
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}