"use client";

import { useState } from "react";

interface Props {
  admin: {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function EditProfileForm({
  admin,
}: Props) {
  const [name, setName] =
    useState(admin.name);

  const [email, setEmail] =
    useState(admin.email);

  const [loading, setLoading] =
    useState(false);

  async function saveProfile() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/settings/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Profile Updated Successfully"
        );
      } else {
        alert(
          data.message ||
            "Update Failed"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-slate-800 p-8">
      <div className="flex flex-col items-center">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white">
          {name.charAt(0)}
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Created At
            </label>

            <input
              value={admin.createdAt}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Updated At
            </label>

            <input
              value={admin.updatedAt}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}