import HospitalForm from "@/components/forms/hospital-form";

export default function HospitalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Hospital Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage hospital information
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <HospitalForm />
      </div>
    </div>
  );
}