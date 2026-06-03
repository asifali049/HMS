import Link from "next/link";
import {
  Building2,
  User,
  Shield,
} from "lucide-react";

export default function SettingsPage() {
  const settings = [
    {
      title: "Hospital Profile",
      description:
        "Manage hospital information",
      href: "/dashboard/settings/hospital",
      icon: Building2,
    },
    {
      title: "Admin Profile",
      description:
        "Update administrator profile",
      href: "/dashboard/settings/profile",
      icon: User,
    },
    {
      title: "Security",
      description:
        "Account security settings",
      href: "/dashboard/settings/security",
      icon: Shield,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage hospital and account settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:border-emerald-500"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                <Icon size={24} />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-white">
                {item.title}
              </h2>

              <p className="text-slate-400">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}