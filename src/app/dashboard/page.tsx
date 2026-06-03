"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Users,
  CalendarDays,
  Building2,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    departments: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const doctors = await fetch(
          "/api/doctors"
        ).then((r) => r.json());

        const patients = await fetch(
          "/api/patients"
        ).then((r) => r.json());

        const appointments = await fetch(
          "/api/appointments"
        ).then((r) => r.json());

        const departments = await fetch(
          "/api/departments"
        ).then((r) => r.json());

        setStats({
          doctors:
            doctors.data?.length || 0,
          patients:
            patients.data?.length || 0,
          appointments:
            appointments.data?.length || 0,
          departments:
            departments.data?.length || 0,
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Doctors",
      value: stats.doctors,
      icon: Stethoscope,
    },
    {
      title: "Patients",
      value: stats.patients,
      icon: Users,
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: CalendarDays,
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back, Administrator
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:border-emerald-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  {card.title}
                </span>

                <div className="rounded-xl bg-emerald-500/20 p-3">
                  <Icon
                    size={22}
                    className="text-emerald-400"
                  />
                </div>
              </div>

              <h2 className="mt-5 text-4xl font-bold text-white">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold">
            System Overview
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between rounded-xl bg-slate-800 p-4">
              <span>Total Doctors</span>
              <span>{stats.doctors}</span>
            </div>

            <div className="flex justify-between rounded-xl bg-slate-800 p-4">
              <span>Total Patients</span>
              <span>{stats.patients}</span>
            </div>

            <div className="flex justify-between rounded-xl bg-slate-800 p-4">
              <span>Total Appointments</span>
              <span>{stats.appointments}</span>
            </div>

            <div className="flex justify-between rounded-xl bg-slate-800 p-4">
              <span>Total Departments</span>
              <span>{stats.departments}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold">
            Quick Summary
          </h3>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4">
              Doctors Available:{" "}
              <strong>{stats.doctors}</strong>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              Registered Patients:{" "}
              <strong>{stats.patients}</strong>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              Scheduled Appointments:{" "}
              <strong>{stats.appointments}</strong>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              Active Departments:{" "}
              <strong>{stats.departments}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}