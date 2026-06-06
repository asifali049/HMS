import { prisma } from "@/lib/prisma";
import EditProfileForm from "./EditProfileForm";

export default async function ProfilePage() {
  const admin = await prisma.admin.findFirst();

  if (!admin) {
    return (
      <div className="text-white">
        Admin not found
      </div>
    );
  }

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

      <EditProfileForm
        admin={{
          id: admin.id,
          name: admin.name,
          email: admin.email,
          image: admin.image || "",
          createdAt:
            admin.createdAt.toLocaleDateString(),
          updatedAt:
            admin.updatedAt.toLocaleDateString(),
        }}
      />
    </div>
  );
}