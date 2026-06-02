"use client";

import Link from "next/link";

type Appointment = {
  id: string;
  tokenNumber: number;
  date: string;
  status: string;

  patient: {
    name: string;
  };

  doctor: {
    name: string;
  };
};

interface Props {
  appointments: Appointment[];
}

export default function AppointmentsTable({
  appointments,
}: Props) {
  async function handleDelete(
    id: string
  ) {
    const confirmed = confirm(
      "Delete Appointment?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Appointment Deleted"
        );

        window.location.reload();
      }
    } catch (error) {
      console.error(error);

      alert("Delete Failed");
    }
  }

  function getStatusColor(
    status: string
  ) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-left">
              Token
            </th>

            <th className="p-4 text-left">
              Patient
            </th>

            <th className="p-4 text-left">
              Doctor
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(
            (appointment) => (
              <tr
                key={appointment.id}
                className="border-t"
              >
                <td className="p-4 font-semibold">
                  #
                  {
                    appointment.tokenNumber
                  }
                </td>

                <td className="p-4">
                  {
                    appointment.patient
                      ?.name
                  }
                </td>

                <td className="p-4">
                  {
                    appointment.doctor
                      ?.name
                  }
                </td>

                <td className="p-4">
                  {new Date(
                    appointment.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {
                      appointment.status
                    }
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/appointments/${appointment.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          appointment.id
                        )
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}