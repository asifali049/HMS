"use client";

import { useEffect, useState } from "react";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";

export default function HospitalPage() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    website: "",
  });

  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    fetch("/api/hospital")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setForm({
            name: data.data.name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            address: data.data.address || "",
            city: data.data.city || "",
            state: data.data.state || "",
            pincode: data.data.pincode || "",
            website: data.data.website || "",
          });
        }

        setLoading(false);
      });
  }, []);

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
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Hospital Settings Saved"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    }
  }

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Hospital Settings
        </h1>

        <p className="mt-1 text-slate-500">
          Manage hospital profile and
          contact information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Logo Card */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Hospital Logo
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100">
              <Building2
                size={40}
                className="text-slate-400"
              />
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setLogo(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="w-full rounded-lg border p-3"
              />

              <p className="mt-2 text-sm text-slate-500">
                PNG, JPG, JPEG
                supported
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">
            Hospital Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Hospital Name
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-10 pr-3"
                  placeholder="Apollo Hospital"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-10 pr-3"
                  placeholder="hospital@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-10 pr-3"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Website
              </label>

              <div className="relative">
                <Globe
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={form.website}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      website:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-10 pr-3"
                  placeholder="https://hospital.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city:
                      e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
                placeholder="Prayagraj"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state:
                      e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
                placeholder="Uttar Pradesh"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Pincode
              </label>

              <input
                value={form.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode:
                      e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
                placeholder="211001"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border py-3 pl-10 pr-3"
                  placeholder="Full Hospital Address"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}