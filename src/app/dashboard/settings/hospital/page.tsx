export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export default async function HospitalSettingsPage() {
  const hospital =
    await prisma.hospital.findFirst();

  if (!hospital) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
        <h1 className="text-2xl font-bold text-white">
          Hospital Profile
        </h1>

        <p className="mt-4 text-slate-400">
          No hospital information found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Hospital Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage hospital information
        </p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {hospital.name}
            </h2>

            <p className="text-slate-400">
              Hospital Information
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Mail size={18} />
              Email
            </div>

            <p className="text-white">
              {hospital.email}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Phone size={18} />
              Phone
            </div>

            <p className="text-white">
              {hospital.phone}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <MapPin size={18} />
              City
            </div>

            <p className="text-white">
              {hospital.city}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <MapPin size={18} />
              State
            </div>

            <p className="text-white">
              {hospital.state}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <MapPin size={18} />
              Pincode
            </div>

            <p className="text-white">
              {hospital.pincode}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Globe size={18} />
              Website
            </div>

            <p className="text-white break-all">
              {hospital.website || "N/A"}
            </p>
          </div>

          <div className="md:col-span-2 rounded-xl bg-slate-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <MapPin size={18} />
              Address
            </div>

            <p className="text-white">
              {hospital.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}