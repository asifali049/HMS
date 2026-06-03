import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Hospital Management System
              </h1>

              <p className="text-sm text-slate-400">
                Manage your hospital efficiently
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 px-4 py-2">
              <span className="text-sm text-slate-300">
                Administrator
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}