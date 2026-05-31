import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Hospital", href: "/dashboard/hospital" },
  { name: "Doctors", href: "/dashboard/doctors" },
  { name: "Patients", href: "/dashboard/patients" },
  { name: "Appointments", href: "/dashboard/appointments" },
  { name: "Staff", href: "/dashboard/staff" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">
          HMS
        </h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}