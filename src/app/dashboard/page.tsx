"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] =
    useState({
      doctors: 0,
      patients: 0,
      appointments: 0,
      departments: 0,
    });

  useEffect(() => {
    async function loadStats() {
      const doctors =
        await fetch(
          "/api/doctors"
        ).then((r) => r.json());

      const patients =
        await fetch(
          "/api/patients"
        ).then((r) => r.json());

      const appointments =
        await fetch(
          "/api/appointments"
        ).then((r) => r.json());

      const departments =
        await fetch(
          "/api/departments"
        ).then((r) => r.json());

      setStats({
        doctors:
          doctors.data?.length || 0,
        patients:
          patients.data?.length || 0,
        appointments:
          appointments.data?.length ||
          0,
        departments:
          departments.data?.length ||
          0,
      });
    }

    loadStats();
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-slate-500">
            Doctors
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.doctors}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-slate-500">
            Patients
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.patients}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-slate-500">
            Appointments
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.appointments}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-slate-500">
            Departments
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.departments}
          </p>
        </div>
      </div>
    </div>
  );
}