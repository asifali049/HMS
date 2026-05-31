"use client";

import Link from "next/link";

type Patient = {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  disease?: string;
};

interface Props {
  patients: Patient[];
}

export default function PatientsTable({
  patients,
}: Props) {
  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this patient?"
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">
              Patient ID
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Age
            </th>

            <th className="p-4 text-left">
              Gender
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Disease
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t"
            >
              <td className="p-4">
                {patient.patientId}
              </td>

              <td className="p-4">
                {patient.name}
              </td>

              <td className="p-4">
                {patient.age}
              </td>

              <td className="p-4">
                {patient.gender}
              </td>

              <td className="p-4">
                {patient.phone}
              </td>

              <td className="p-4">
                {patient.disease || "-"}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/patients/${patient.id}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        patient.id
                      )
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}