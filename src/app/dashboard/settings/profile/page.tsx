import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const admin = await prisma.admin.findFirst();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Admin Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage administrator profile
        </p>
      </div>

      <div className="rounded-2xl bg-slate-800 p-8">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white">
            {admin?.name?.charAt(0) || "A"}
          </div>

          <div className="grid w-full gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full Name
              </label>

              <input
                value={admin?.name || ""}
                readOnly
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email Address
              </label>

              <input
                value={admin?.email || ""}
                readOnly
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Created At
              </label>

              <input
                value={
                  admin?.createdAt
                    ?.toLocaleDateString() || ""
                }
                readOnly
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Last Updated
              </label>

              <input
                value={
                  admin?.updatedAt
                    ?.toLocaleDateString() || ""
                }
                readOnly
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>
          </div>

          <button className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}