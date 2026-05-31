import { prisma } from "@/lib/prisma";
import {
  Users,
  Stethoscope,
  Calendar,
  IndianRupee,
} from "lucide-react";

import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  const totalDoctors =
    await prisma.doctor.count();

  const totalPatients =
    await prisma.patient.count();

  const totalAppointments =
    await prisma.appointment.count();

  const revenue =
    await prisma.bill.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

  const totalRevenue =
    revenue._sum.totalAmount || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Hospital Overview
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Users className="mb-3 text-blue-600" />
          <p className="text-slate-500">
            Patients
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalPatients}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Stethoscope className="mb-3 text-green-600" />
          <p className="text-slate-500">
            Doctors
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalDoctors}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Calendar className="mb-3 text-orange-500" />
          <p className="text-slate-500">
            Appointments
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalAppointments}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <IndianRupee className="mb-3 text-purple-600" />
          <p className="text-slate-500">
            Revenue
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}