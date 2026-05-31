import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="mb-6 text-2xl font-bold">
          MediCore
        </h1>

        <nav className="space-y-3">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/doctors">Doctors</Link>
          <Link href="/dashboard/patients">Patients</Link>
          <Link href="/dashboard/appointments">
            Appointments
          </Link>
          <Link href="/dashboard/billing">
            Billing
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-slate-50">
        {children}
      </main>
    </div>
  );
}