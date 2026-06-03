"use client";

import Link from "next/link";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  mobile: string;
};

interface Props {
  doctors: Doctor[];
}

export default function DoctorsTable({
  doctors,
}: Props) {
  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/doctors/${id}`,
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
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Specialization
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Qualification
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Experience
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Fee
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Mobile
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {doctors.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-slate-400"
              >
                No doctors found
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="transition hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-white">
                  {doctor.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {doctor.specialization}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {doctor.qualification}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {doctor.experience} Years
                </td>

                <td className="px-6 py-4 text-slate-300">
                  ₹{doctor.consultationFee}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {doctor.mobile}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/doctors/${doctor.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          doctor.id
                        )
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
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