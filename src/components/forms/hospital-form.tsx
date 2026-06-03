"use client";

import { useEffect, useState } from "react";

export default function HospitalForm() {
  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      website: "",
      logo: "",
    });

  useEffect(() => {
    loadHospital();
  }, []);

  async function loadHospital() {
    try {
      const response = await fetch(
        "/api/hospital"
      );

      const result =
        await response.json();

      if (result.data) {
        setFormData({
          name:
            result.data.name || "",
          email:
            result.data.email || "",
          phone:
            result.data.phone || "",
          address:
            result.data.address || "",
          city:
            result.data.city || "",
          state:
            result.data.state || "",
          pincode:
            result.data.pincode ||
            "",
          website:
            result.data.website ||
            "",
          logo:
            result.data.logo || "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/hospital",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const result =
        await response.json();

      if (result.success) {
        alert(
          "Hospital information saved successfully"
        );

        await loadHospital();
      } else {
        alert(
          result.message ||
            "Failed to save"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="text-white">
        Loading hospital data...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Hospital Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Phone
          </label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Website
          </label>

          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            City
          </label>

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            State
          </label>

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Pincode
          </label>

          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Logo URL
          </label>

          <input
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Address
        </label>

        <textarea
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
      >
        Update Hospital
      </button>
    </form>
  );
}