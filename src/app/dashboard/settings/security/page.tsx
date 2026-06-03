"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Shield, LogOut } from "lucide-react";

export default function SecurityPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/settings/password",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Password Updated Successfully"
        );

        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(
          data.message ||
            "Update Failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Security Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage password and account security
        </p>
      </div>

      {/* Change Password */}
      <div className="mb-6 rounded-2xl bg-slate-800 p-8">
        <div className="mb-6 flex items-center gap-3">
          <Shield
            className="text-emerald-500"
            size={28}
          />

          <h2 className="text-2xl font-semibold text-white">
            Change Password
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="Current Password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            value={
              form.currentPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                currentPassword:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            value={form.newPassword}
            onChange={(e) =>
              setForm({
                ...form,
                newPassword:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            value={
              form.confirmPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="rounded-2xl bg-slate-800 p-8">
        <div className="mb-4 flex items-center gap-3">
          <LogOut
            className="text-red-500"
            size={28}
          />

          <h2 className="text-2xl font-semibold text-white">
            Logout
          </h2>
        </div>

        <p className="mb-6 text-slate-400">
          Sign out from Hospital
          Management System.
        </p>

        <button
          onClick={() => signOut()}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}