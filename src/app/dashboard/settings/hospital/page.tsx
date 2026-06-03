import { prisma } from "@/lib/prisma";

export default async function HospitalSettingsPage() {
  const hospital =
    await prisma.hospital.findFirst();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Hospital Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage hospital information
        </p>
      </div>

      <div className="rounded-2xl bg-slate-800 p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Hospital Name
            </label>

            <input
              value={hospital?.name || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              value={hospital?.email || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone
            </label>

            <input
              value={hospital?.phone || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              City
            </label>

            <input
              value={hospital?.city || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              State
            </label>

            <input
              value={hospital?.state || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Pincode
            </label>

            <input
              value={hospital?.pincode || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Address
            </label>

            <textarea
              value={hospital?.address || ""}
              readOnly
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Website
            </label>

            <input
              value={hospital?.website || ""}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}