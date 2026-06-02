"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const response = await fetch(
          `/api/departments/${id}`
        );

        const data =
          await response.json();

        if (data.success) {
          setForm({
            name:
              data.data?.name || "",
            description:
              data.data
                ?.description || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDepartment();
    }
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/departments/${id}`,
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
          "Department Updated Successfully"
        );

        router.push(
          "/dashboard/departments"
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
    <div className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Department
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <input
          type="text"
          placeholder="Department Name"
          className="w-full rounded-lg border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <textarea
          rows={5}
          placeholder="Department Description"
          className="w-full rounded-lg border p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-white"
        >
          Update Department
        </button>
      </form>
    </div>
  );
}