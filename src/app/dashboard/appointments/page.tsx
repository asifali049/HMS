"use client";

import Link from "next/link";
import { useAppointments } from "@/hooks/use-appointments";

export default function AppointmentsPage() {
  const { data, isLoading } =
    useAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <Link
          href="/dashboard/appointments/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Appointment
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map(
            (appointment: any) => (
              <tr key={appointment.id}>
                <td>
                  {appointment.tokenNumber}
                </td>
                <td>
                  {
                    appointment.patient
                      .name
                  }
                </td>
                <td>
                  {
                    appointment.doctor
                      .name
                  }
                </td>
                <td>
                  {new Date(
                    appointment.date
                  ).toLocaleDateString()}
                </td>
                <td>
                  {appointment.time}
                </td>
                <td>
                  {appointment.status}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}