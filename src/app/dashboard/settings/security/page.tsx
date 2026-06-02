"use client";

import { useState } from "react";

export default function SecurityPage() {
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
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Security Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full rounded-lg border p-3"
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
            className="w-full rounded-lg border p-3"
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
            className="w-full rounded-lg border p-3"
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
            className="rounded-lg bg-emerald-600 px-5 py-3 text-white"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}