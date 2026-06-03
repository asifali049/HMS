"use client";

import Link from "next/link";

type Appointment = {
  id: string;
  tokenNumber: number;
  date: string;
  time: string;
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
  async function deleteAppointment(
    id: string
  ) {
    const ok = confirm(
      "Delete Appointment?"
    );

    if (!ok) return;

    try {
      const response =
        await fetch(
          `/api/appointments/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      await fetch(
        `/api/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4 text-left text-slate-300">
              Token
            </th>

            <th className="p-4 text-left text-slate-300">
              Patient
            </th>

            <th className="p-4 text-left text-slate-300">
              Doctor
            </th>

            <th className="p-4 text-left text-slate-300">
              Date
            </th>

            <th className="p-4 text-left text-slate-300">
              Time
            </th>

            <th className="p-4 text-left text-slate-300">
              Status
            </th>

            <th className="p-4 text-left text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {appointments.length ===
          0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-10 text-center text-slate-400"
              >
                No Appointments Found
              </td>
            </tr>
          ) : (
            appointments.map(
              (appointment) => (
                <tr
                  key={
                    appointment.id
                  }
                  className="border-t border-slate-800"
                >
                  <td className="p-4 text-white">
                    {
                      appointment.tokenNumber
                    }
                  </td>

                  <td className="p-4 text-white">
                    {
                      appointment
                        .patient
                        ?.name
                    }
                  </td>

                  <td className="p-4 text-white">
                    {
                      appointment
                        .doctor
                        ?.name
                    }
                  </td>

                  <td className="p-4 text-slate-300">
                    {new Date(
                      appointment.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-slate-300">
                    {
                      appointment.time
                    }
                  </td>

                  <td className="p-4">
                    <select
                      value={
                        appointment.status
                      }
                      onChange={(e) =>
                        updateStatus(
                          appointment.id,
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                    >
                      <option value="PENDING">
                        Pending
                      </option>

                      <option value="COMPLETED">
                        Completed
                      </option>

                      <option value="CANCELLED">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <Link
                        href={`/dashboard/appointments/${appointment.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteAppointment(
                            appointment.id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}