"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            name: data.data?.name || "",
            email: data.data?.email || "",
            image: data.data?.image || "",
          });
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/profile",
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
          "Profile Updated Successfully"
        );
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Profile Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">

          {/* Profile Image */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <Image
              src="/doctor.png"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border object-cover"
            />
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Admin Name"
            className="w-full rounded-lg border p-3"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-white"
            >
              Save Changes
            </button>

            <Link
              href="/dashboard/settings/security"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Change Password
            </Link>
          </div>

        </div>
      </form>
    </div>
  );
}