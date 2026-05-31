export async function getAppointments() {
  const res = await fetch("/api/appointments");

  if (!res.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return res.json();
}