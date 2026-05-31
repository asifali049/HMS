export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold">
        Hospital Management System
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          Admin
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
          A
        </div>
      </div>
    </header>
  );
}