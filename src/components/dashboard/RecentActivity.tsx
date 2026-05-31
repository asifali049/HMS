export default function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">
        <div className="border-l-4 border-green-500 pl-4">
          New Patient Registered
        </div>

        <div className="border-l-4 border-blue-500 pl-4">
          Doctor Added Successfully
        </div>

        <div className="border-l-4 border-orange-500 pl-4">
          Appointment Booked
        </div>

        <div className="border-l-4 border-purple-500 pl-4">
          Bill Generated
        </div>
      </div>
    </div>
  );
}