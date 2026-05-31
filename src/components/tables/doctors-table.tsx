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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Specialization
            </th>

            <th className="p-4 text-left">
              Qualification
            </th>

            <th className="p-4 text-left">
              Experience
            </th>

            <th className="p-4 text-left">
              Fee
            </th>

            <th className="p-4 text-left">
              Mobile
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className="border-t"
            >
              <td className="p-4">
                {doctor.name}
              </td>

              <td className="p-4">
                {doctor.specialization}
              </td>

              <td className="p-4">
                {doctor.qualification}
              </td>

              <td className="p-4">
                {doctor.experience} Years
              </td>

              <td className="p-4">
                ₹
                {doctor.consultationFee}
              </td>

              <td className="p-4">
                {doctor.mobile}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/doctors/${doctor.id}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        doctor.id
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