"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAppointments } from "@/hooks/use-appointments";

export default function AppointmentsPage() {
  const { data, isLoading } =
    useAppointments();

  async function deleteAppointment(
    id: string
  ) {
    const ok = confirm(
      "Delete Appointment?"
    );

    if (!ok) return;

    await fetch(
      `/api/appointments/${id}`,
      {
        method: "DELETE",
      }
    );

    window.location.reload();
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
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
  }

  if (isLoading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Appointments
          </h1>

          <p className="mt-2 text-slate-400">
            Manage patient appointments
          </p>
        </div>

        <Link
          href="/dashboard/appointments/add"
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600"
        >
          <Plus size={18} />
          New Appointment
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
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
                Time
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
            {data?.data?.map(
              (appointment: any) => (
                <tr
                  key={appointment.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4 text-white">
                    {
                      appointment.tokenNumber
                    }
                  </td>

                  <td className="p-4 text-white">
                    {
                      appointment.patient
                        ?.name
                    }
                  </td>

                  <td className="p-4 text-white">
                    {
                      appointment.doctor
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
                        className="rounded-lg bg-blue-600 p-2 text-white"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() =>
                          deleteAppointment(
                            appointment.id
                          )
                        }
                        className="rounded-lg bg-red-600 p-2 text-white"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}