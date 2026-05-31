export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-6">
          <h2 className="text-gray-500">
            Total Doctors
          </h2>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-gray-500">
            Total Patients
          </h2>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-gray-500">
            Today's Appointments
          </h2>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-gray-500">
            Total Staff
          </h2>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>
      </div>
    </div>
  );
}