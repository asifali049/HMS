"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/register",
      {
        method: "POST",
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
        "Account Created Successfully"
      );

      router.push("/login");
    } else {
      alert(
        data.error ||
          "Registration Failed"
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Admin Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="mb-4 w-full rounded-lg border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border p-3"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 py-3 text-white"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}